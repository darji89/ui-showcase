/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import Hammer from 'hammerjs';
import Router from 'routerActions';

import Application from './containers/Application';

import 'style-loader!app.sass';
const defaultStyles = (require('app.sass'):any).locals.styles;

import stateContainer from 'stateStore';

const appContainer = document.getElementById('app');
appContainer.className = defaultStyles;

const userAgent = navigator.userAgent || navigator.vendor || window.opera;

if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
  const attachFastClick = require('fastclick');
  attachFastClick.attach(document.body);
}

if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i) || userAgent.match(/Android/i)) {
  appContainer.style.width = '100%';
  appContainer.style.height = '100%';
}

console.log('ENV', process.env.DEVTYPE);

if (module.hot) {
  module.hot.accept(Application, () => {
    renderApplication();
  });
}

const renderApplication = () => {
  ReactDOM.render(<Application state={stateContainer.store}/>, appContainer);
};

document.addEventListener('backbutton', () => {

  if ( stateContainer.store.getIn(['routing','history']).size > 1) {
    Router.RouteBack()
  }
  else {
    navigator.app && navigator.app.exitApp();
  }

}, true);

export const hammer = new Hammer.Manager(appContainer);
export default renderApplication;

renderApplication();

