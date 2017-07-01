/* @flow */
'use strict';

import Immutable from 'immutable';
import stateContainer from 'stateStore';
import renderApplication from './../app.js';

import Router from 'routerActions'

const notificationQueue = [];

let notificationTimeout;

export function performAction (func) {
  stateContainer.store = func(stateContainer.store);
  renderApplication();
}

export function NoRenderAction (func) {
  stateContainer.store = func(stateContainer.store);
}

export const NotifyUser = (message, title, type) => {
  const endNotification = () => {
    HideNotification();
    window.clearTimeout(notificationTimeout);
    notificationTimeout = null;

    if( notificationQueue.length ) {
      const notification = notificationQueue.shift();
      NotifyUser( notification.message, notification.title, notification.type );
    }
  };

  if( notificationTimeout ) {
    window.clearTimeout( notificationTimeout );
    notificationTimeout = window.setTimeout( endNotification, 4000 );
    notificationQueue.push( { message, title, type } );
    return;
  }

  NoRenderAction(store => store.set('notification', Immutable.fromJS({
    message,
    title,
    type
  })));
  Router.ToggleNotify(true);

  notificationTimeout = window.setTimeout( endNotification, 7000);
};

export const HideNotification= () => {
  NoRenderAction(store => store.set('notification', Immutable.fromJS({
    message: null,
    title: null,
    type: null
  })));
  Router.ToggleNotify(false);
};

export const PromptUser = (promptName) => {
  NoRenderAction(store => store.set('activePrompt', promptName));
  Router.RoutTo('Prompt');
};

