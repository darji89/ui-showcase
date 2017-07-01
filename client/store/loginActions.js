/* @flow */
'use strict';

import Immutable from 'immutable';
import stateContainer from 'stateStore';
import { performAction, NoRenderAction, PromptUser } from 'performAction';
import Router from 'RouterActions';
import { backendTransaction, useToken } from '../api/net.js';
import Persistence from '../api/persistence.js';
import InfoStack from '../api/infostack.js';
//import { processPossibleAchievements } from 'achievements';
///Implementing this import causes an error
// It was just a circular dependency silly
// And processPossibleAchievements is already called by the onsessionhandler in achievements.js
// And shoudn't achievements be processed on the backend?

const state = {
  session: {
    user: null,
    supp: null
  },
  user: null,
  facebookURL: null,
  last: null
};

const tr = {
  'APP_ERROR_AUTHENTICATE': 'authentication failed',
  'APP_ERROR_NETWORK': 'cannot connect to the server',
  'APP_ERROR_DATA': 'the data returned by the server cannot be read',
  'APP_ERROR_TYPE': 'unexpected response from the server'
};

const emptyRegistration = {
  email: '',
  facebookId: -1,
  gamestateId: -1,
  loggedIn: false,
  profilePic: '',
  userId: -1,
  userType: 'anon',
  status: 0, // 0: enabled, 1: disabled (abuse)
  reasoncode: ''
};

export default {
  requestInstance,             // get a token referring to a instance and possible user
  connectNewAnonUser,          // request connection of new anon user to instance
  requestEmailVerification,    // request connection of new email-verified user to the instance
  finalizeEmailVerification,   // get token for verified user
  requestFacebookVerification, // request connection of new facebook-verified user to the instance
  registerOnSessionHandler,    // add a handler that will be called when a session is established (new token)
  registerOnLoginHandler,      // add a handler that will be called when a registered user logs in
  registerOnLogoutHandler,
  logoutUser,                  // removes token, then calls requestInstance
  authProblem                  // backend reports authentication error
};

console.log('LOGINACTIONS');

const sessionCallbacks = [];
let sessionCallbacksCalled = false;

const loginCallbacks = [];
let loginCallbacksCalled = false;

const logoutCallbacks = [];
let logoutCallbacksCalled = false;

/*
 export function onSession
   register callback for session events
 export const handleFacebookLogin
   present facebook login interaction
 export const handleEmailLogin
   pass email and username to be verified by email
 export const checkEmailLogin
   ask backend for token with new claim based on email verification step
 export const handleAnonLogin
   try to reuse stored token (device or device+user), when fails ask device token (anon === device without user)
 export const onLoginError
   show error message in a dialog
 export const onLoginOk
   show login success message in a dialog
 export const HandleUserLogout
   discard token, remove token from store, reset state
 */


function callSessionCallbacks() {
  sessionCallbacksCalled = true;
  setTimeout(()=>{
    sessionCallbacks.forEach(fun => fun());
  });
}

function registerOnSessionHandler (fun) {
  if( sessionCallbacksCalled ) return fun();

  sessionCallbacks && sessionCallbacks.push( fun ) || setTimeout(()=>{
    sessionCallbacks.push(fun);
  });
}

function callLoginCallbacks() {
  loginCallbacksCalled = true;
  setTimeout(()=>{
    loginCallbacks.forEach(fun => fun());
  });
}

function registerOnLoginHandler (fun) {
  if( loginCallbacksCalled ) return fun();

  loginCallbacks && loginCallbacks.push( fun ) || setTimeout(() => {
    loginCallbacks.push(fun);
  })
}

function registerOnLogoutHandler( fun ) {
  logoutCallbacks.push( fun );
}

function requestFacebookVerification () {
  var pollCount = 0;
  backendTransaction('session', 'fb_login', {}, function (error) {
    if (error) {
      onLoginError(tr[error] ? tr[error] : error);
    }
    else if (state.facebookURL) {
      window.facebook = state.facebookURL;
      var pop = window.cordova ? window.open(state.facebookURL, '_blank') : window.open(state.facebookURL);
      var timer = window.setInterval(() => {
        pollFacebookRegistration( registered => {
           pollCount++;
           if (pollCount > 60 || registered) {
             clearTimeout(timer);
             pop.close();
             if (registered) checkRegistration('facebook');
           }
        });
      }, 2000);
    }
  }, state, 'facebookURL');
}


function requestEmailVerification (data: {email: string, name: string}) {
  backendTransaction('session', 'mail_login', {email: data.email, username: data.name}, function (error, timeStamp) {
    if (error) {
      onLoginError(tr[error] ? tr[error] : error);
    }
    else {
      console.log(state.last);
    }
  }, state, 'last');
}

/*
 after user has completed the email verification using users email client, user presses a button to continue
 */
function finalizeEmailVerification () {
  checkRegistration('email');
}

/*
 Check if mail/fb registration process is completed successfully
 If so, token will be replaced by token with user claim
*/
function checkRegistration (type) {
  backendTransaction('session', 'refresh_token', {}, function (error, timeStamp) {
    if (error) {
      console.error("Cannot refresh token:", error);
      PromptUser('mailAuthFail');
    }
    else {
      useToken(state.user && state.user.token);
      Persistence.set(Persistence.names.user, state.user);
      registrationState({
        loggedIn: true,
        name: state.user && state.user.name,
        email: state.user && state.user.email,
        facebookId: state.user && state.user.authType === 'fb' ? state.user && state.user.user : '',
        userType: state.user.authType,
        status: state.user.status,
        reasoncode: state.user.reasoncode
      });
      if (state.user)
        console.log('successfully refreshed token for ' + state.user.name);
      else
        console.error('failed to refresh token');

      callSessionCallbacks();
    }
  }, state, 'user');
}

// check facebook registration status (no state change on backend)
// calls cbRegistered(boolean registered)
function pollFacebookRegistration (cbRegistered) {
  backendTransaction('session', 'poll_token', {}, function (error) {
    cbRegistered(!error);
  }, state, 'devnull');
}

function incBalance(amount) {
  const oldBalance = stateContainer.store.getIn(['galaxyWheel', 'balance']);
  performAction(store => store.setIn(['galaxyWheel', 'balance'], oldBalance + amount));
}

/*
 Called when title screen is mounted. Try to reuse persistent user, fallback on anonimous login
  */
function requestInstance () {
  var prevUser = Persistence.get(Persistence.names.user);

  if (prevUser && prevUser.token) {
    console.log('using existing login');
    useToken(prevUser.token);

    /*
      Refresh token. Backend returns:
        user: user object containing new token
        supp: supplementary info
           supp.spin: true when 12h-period spin has been added
     */
    backendTransaction('session', 'resession', {}, function (error, timeStamp) {
      if (error) {
        console.error('ERR', error);
        if (error == 'APP_ERROR_AUTHENTICATE') {
          PromptUser('accountProblem');
          clearState();
        } else if (error == 'APP_ERROR_NETWORK')
          PromptUser('noConnection');
        else if (error == 'VERSION')
          PromptUser('update');
        else
          onLoginError(tr[error] ? tr[error] : error);
      } else {
        console.log('info for user: ', state.session);
        console.log('SPINADDED:', state.session.supp.spin);
        if (state.session.supp.spin)
          incBalance(1);
        InfoStack.set(InfoStack.names.spinadded, state.session.supp.spin);
        if (state.session.user && state.session.user.token) {
          useToken(state.session.user.token);
          Persistence.set(Persistence.names.user, state.session.user);
          registrationState({
            loggedIn: true,
            name: state.session.user.name,
            email: state.session.user.email,
            facebookId: state.session.user.authType === 'fb' ? prevUser.user : '',
            userType: state.session.user.authType,
            status: state.session.user.status,
            reasoncode: state.session.user.reasoncode
          });
          //processPossibleAchievements({loggedIn: timeStamp});
          callSessionCallbacks();
        }
        else {
          PromptUser('accountProblem');
          clearState();
        }
      }
    }, state, 'session');
    
    
  } else {
    console.log('using anon login');
    connectNewAnonUser();
  }
}

/*
   connect(login) a new anonymous user to the device
 */
function connectNewAnonUser() {
  /*
   Connect new anon user. Backend returns:
   user: user object containing new token
   supp: supplementary info
   supp.spin: true when 12h-period spin has been added
   */
  backendTransaction('session', 'anonuser', {}, function (error, timeStamp) {
    if (error) {
      if (error == 'APP_ERROR_AUTHENTICATE') {
        PromptUser('accountProblem');
        clearState();
      } else if (error == 'APP_ERROR_NETWORK')
        PromptUser('noConnection');
      else if (error == 'VERSION')
        PromptUser('update');
      else
        onLoginError(tr[error] ? tr[error] : error);
    }
    else {
      console.log('new anon user connected to device: ', state.user);
      if (state.user && state.user.token) {
        useToken(state.user.token);
        Persistence.set(Persistence.names.user, state.user);
        registrationState({
          loggedIn: true,
          name: state.user.name,
          email: state.user.email,
          facebookId: state.user.authType === 'fb' ? prevUser.user : '',
          userType: state.user.authType,
          status: state.user.status,
          reasoncode: state.user.reasoncode
        });

        callSessionCallbacks();
      }
      else {
        PromptUser('accountProblem');
        clearState();
      }
    }
  }, state, 'user');
}

function registrationState (registrationData) {
  const userInformation = stateContainer.store.getIn(['userInformation', 'data']).toObject();
  NoRenderAction(store => store.setIn(['userInformation', 'data'], Immutable.fromJS(
    Object.assign({}, userInformation, registrationData)
  )));

  //Only show Tutorial if it's the first time playing the app
  //stateContainer.store.getIn(['galaxyWheel', 'tutorialCompleted'])
  let tutorialCompleted = Persistence.get(Persistence.names.state.tutorialCompleted);
  let user = Persistence.get(Persistence.names.user);

  ///Check to see if user has accepted the userAgreement - this needs to check with the backend
  const userAgreementAccepted = Persistence.get(Persistence.names.state.userAgreementAccepted);

  //console.log('REGSTATE check', user);
  if (user && user.authType == 'anon'){
    Router.RoutTo('Title');
  }
  else if (!userAgreementAccepted){
    Router.RoutTo('Disclaimer');
  }
  else if (!tutorialCompleted) {
    Router.RoutTo('Tutorial');
    Persistence.set(Persistence.names.state.tutorialCompleted);
  } else Router.RoutTo('Menu');

  // debugger;
  if (registrationData.status === 1) {
    PromptUser('accountBlocked');
  }
  else if (registrationData.status === -1) {
    PromptUser('beenLoggedOut');
  }
  else if (registrationData && registrationData.loggedIn && registrationData.userType !== null && registrationData.userType !== 'anon') {
    onLoginOk(InfoStack.pop(InfoStack.names.spinadded));
  }

}

function onLoginError (error: string) {
  console.error('HANDLE LOGIN ERROR:', error);
  NoRenderAction(store => store.setIn(['dialog', 'message'], 'Login Failed: ' + error));
  PromptUser('authFail');
}

function onLoginOk(freeSpin) {
  callLoginCallbacks();

  freeSpin
    ? PromptUser('welcomeBackClaim')
    : PromptUser('welcomeBack');
}


// clear token and all user information
function clearState() {
  const userInformation = stateContainer.store.getIn(['userInformation', 'data']).toObject();
  NoRenderAction(store => store.setIn(['userInformation', 'data'], Immutable.fromJS(
    Object.assign({}, userInformation, emptyRegistration)
  )));

  Persistence.del(Persistence.names.user);
  Persistence.del( Persistence.names.achievements );
}

function logoutUser () {
  clearState();
  Persistence.clear();

  logoutCallbacks.forEach(fun => fun());

  NoRenderAction(store => store.set('appSettings', Immutable.fromJS({
    music: true,
    sound: true,
    notification: true
  })));
  NoRenderAction(store => store.set('galaxyWheel', Immutable.fromJS({
    achievements: [],
    balance: 0,
    highscores: [], // dummyHighScores,
    lastColors: [],
    powerup: null,
    ranking: Infinity,
    resources: 0,
    ticketConversion: 30,
    wheelState: 'idle'
  })));
  connectNewAnonUser();
}

function authProblem() {
  clearState();
  PromptUser('beenLoggedOut');
}

