/* @flow */
'use strict';

import Immutable from 'immutable';
import Map from 'immutable';
import List from 'immutable';

export type appSettings =
		Map<'music', boolean>&
		Map<'soundEffects', boolean>&
		Map<'notifications', boolean>;

export type dialog =
		Map<'message', string>&
		Map<'type', string>;

export type notification =
		Map<'message', string>&
		Map<'title', string>&
		Map<'type', string>;

export type routing =
		Map<'history', Immutable.List<string>>&
          Map<'path', string>;

export type action =
        Map<'status', string>&
        Map<'message', string>;

export type userData =
        Map<'status', number>&
        Map<'reasoncode', string>&
		Map<'email', string>&
		Map<'facebookId>', string>&
		Map<'gamestateId', number>&
		Map<'loggedIn', boolean>&
		Map<'name', string>&
		Map<'profilePic', string>&//Change type file with jpeg or png extenstion
		Map<'userId', string>&
		Map<'userType', string>;

export type userInformation =
  Map<'action', action>&
  Map<'userId', userData>;

export type achievement =
		Map<'completed', boolean|number>&
		Map<'description', string>&
		Map<'goal', boolean|number>&
		Map<'id', number>&
		Map<'name', string>;

export type achievementsList = Immutable.List<achievement>;

export type consecutiveDaysPlayed =
		Map<'counter', number>&
		Map<'lastDayPlayed', number>; //UnixTime ?

export type highScore =
		Map<'score', number>&
		Map<'name', string>;
		// Map<'profilePic', string>& //Change type file with jpeg or png extenstion
		// Map<'rank', number>&
		// Map<'userId', number>;

export type highScoreList = List<highScore>;

export type dailyChallenge =
		Map<'name', string>&
		Map<'description', string>&
		Map<'type', string>&
		Map<'winning', number>;

export type galaxyWheel =
		Map<'achievements', achievementsList>&
		Map<'balance', number>&
		Map<'consecutiveDaysPlayed', consecutiveDaysPlayed>&
		Map<'dailyChalange', dailyChallenge>&
		Map<'firstTime', boolean>&
		Map<'freeSpins', number>&
		Map<'highscores', highScoreList>&
    Map<'ranking', number>&
		Map<'lastDalySpin', number>& // unixTime synced with the backend
		Map<'powerup', string>&
		Map<'resources', number>&
		Map<'spinAverage', number>&
		Map<'ticketConversion', number>;

export type transaction =
    Map<'code', string>&
    Map<'amount', number>

export type Store =
		Map<'appSetting', appSettings>&
		Map<'dialog', dialog>&
		Map<'notification', notification>&
		Map<'routing', routing>&
		Map<'unixTime', number>&
		Map<'userInformation', userInformation>&
        Map<'galaxyWheel', galaxyWheel>&
        Map<'transaction', transaction>;

//Dumy Data
// const dummyAchievements = [
// 	{id: 0, name: 'Beginners Luck', completed: 50, description: 'Vind meer dan 50 unobtanium in 1 spin', goal: 50},
// 	{id: 1, name: 'An offer you cant resist', completed: 500, description: 'Geef minder dan 1000 unobtanium  uit', goal: 1000},
// 	{id: 2, name: 'Engage Warp Speed', completed: 3, description: 'Bezoek 3 rode planeten', goal: 3},
// 	{id: 3, name: 'Beam me up scotty', completed: 6, description: 'Koop 5 keer nieuwe energy cores', goal: 5},
// 	{id: 4, name: 'Yarrrr', completed: 500, description: 'Verzamel meer dan 10.000 unobtanium zonder uit te geven', goal: 10000},
// 	{id: 6, name: 'Ka-Ching!', completed: false, description: 'Koop een prijs bij Gamestate', goal: true},
// 	{id: 7, name: 'Hurry up slowpoke', completed: true, description: 'Gebruik de time-wrap 3 keer', goal: true},
// 	{id: 8, name: 'Capiche?', completed: true, description: 'Neem de onboarding door', goal: true},
// 	{id: 9, name: 'Yarrrr', completed: 500, description: 'Verzamel meer dan 10.000 unobtanium zonder uit te geven', goal: 10000},
// 	{id: 10, name: 'Ka-Ching!', completed: false, description: 'Koop een prijs bij Gamestate', goal: true},
// 	{id: 11, name: 'Hurry up slowpoke', completed: true, description: 'Gebruik de time-wrap 3 keer', goal: true},
// 	{id: 12, name: 'Capiche?', completed: true, description: 'Neem de onboarding door', goal: true},
// 	{id: 30, name: 'Beginners Luck', completed: 50, description: 'Vind meer dan 50 unobtanium in 1 spin', goal: 50},
// 	{id: 31, name: 'An offer you cant resist', completed: 500, description: 'Geef minder dan 1000 unobtanium  uit', goal: 1000},
// 	{id: 32, name: 'Engage Warp Speed', completed: 3, description: 'Bezoek 3 rode planeten', goal: 3},
// 	{id: 33, name: 'Beam me up scotty', completed: 6, description: 'Koop 5 keer nieuwe energy cores', goal: 5},
// 	{id: 34, name: 'Yarrrr', completed: 500, description: 'Verzamel meer dan 10.000 unobtanium zonder uit te geven', goal: 10000},
// 	{id: 36, name: 'Ka-Ching!', completed: false, description: 'Koop een prijs bij Gamestate', goal: true},
// 	{id: 37, name: 'Hurry up slowpoke', completed: true, description: 'Gebruik de time-wrap 3 keer', goal: true},
// 	{id: 38, name: 'Capiche?', completed: true, description: 'Neem de onboarding door', goal: true},
// 	{id: 39, name: 'Yarrrr', completed: 500, description: 'Verzamel meer dan 10.000 unobtanium zonder uit te geven', goal: 10000},
// 	{id: 310, name: 'Ka-Ching!', completed: false, description: 'Koop een prijs bij Gamestate', goal: true},
// 	{id: 311, name: 'Hurry up slowpoke', completed: true, description: 'Gebruik de time-wrap 3 keer', goal: true},
// 	{id: 312, name: 'Capiche?', completed: true, description: 'Neem de onboarding door', goal: true}
// ];

// const dummyHighScores = [
// 	{userId: 101012101, name: 'Max Jansen', rank: 1234950, credits: 7596150},
// 	{userId: 201021010, name: 'David de Jong', rank: 1789950, credits: 7456150},
// 	{userId: 301031010, name: 'Lisa Wierts', rank: 1234950, credits: 7074650},
// 	{userId: 401041010, name: 'Thomsd Hillhorst', rank: 1234950, credits: 7074050},
// 	{userId: 501051010, name: 'Paul Hendriks', rank: 1234950, credits: 6000550},
// 	{userId: 601061010, name: 'Rik Haagsma', rank: 1234950, credits: 6000000},
// 	{userId: 701071010, name: 'Kim Kiesteloo', rank: 1234950, credits: 5830550},
// 	{userId: 701071010, name: 'Chris Slagman', rank: 1234950, credits: 4730250},
// 	{userId: 701071010, name: 'Diederik Koelewijn', rank: 1234950, credits: 4685550},
// 	{userId: 701071010, name: 'Gino Booms', rank: 1234950, credits: 3550150},
// 	{userId: 701071010, name: 'Laura Verschuure', rank: 1234950, credits: 3250050},
// 	{userId: 801081010, name: 'Roy Swaan', rank: 1234950, credits: 3230150},
// 	{userId: 901091010, name: 'Eric Sterenberg', rank: 1234950, credits: 230000},
// 	{userId: 121081010, name: 'Eva Jansens', rank: 1234950, credits: 229500},
// 	{userId: 131071010, name: 'Suzan Maas', rank: 1234950, credits: 53500},
// 	{userId: 141061010, name: 'Naomi Melters', rank: 1234950, credits: 13500},
// 	{userId: 151051010, name: 'Sebas van der Sangen', rank: 1234950, credits: 6050},
// 	{userId: 161041010, name: 'Chris Boontjes', rank: 1234950, credits: 5200},
// 	{userId: 171031010, name: 'Maria Wiltenburg', rank: 1234950, credits: 2510},
// ];


const stateContainer: {store: Store} = {
  store: Immutable.fromJS({
    activePrompt: '',
    appSettings: {
      music: true,
      sound: true,
      notification: true
    },
    dialog: {
      message: '',
      type: ''
    },
    notification: {
      message: '',
      title: '',
      type: ''
    },
    routing: {
      history: [],
      path: {
        primary: 'SplashScreen',
        secondary: '',
        notify: false,
      },
    },
    userInformation: {
      action: {
        status: 'IDLE',
        message: ''
      },
      data: {
        status: 0,
        reasoncode: '',
        email: '',
        facebookId: -1,
        gamestateId: -1,
        loggedIn: false,
        name: '',
        profilePic: '',
        userId: null,
        userType: 'anon'
      }
    },
    unixTime: -1,
    galaxyWheel: {
      achievements: [],
      balance: 0,
      highscores: [], // dummyHighScores,
      lastColors: [],
      powerup: null,
      ranking: Infinity,
      resources: 0,
      ticketConversion: 30,
      wheelState: 'idle'
    },
    transaction: {
        code: null,
        amount: 0
    }
  })
};


export default stateContainer

window.stateContainer = stateContainer;