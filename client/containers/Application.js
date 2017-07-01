/* @flow */
'use strict';
import React from 'react';

import 'style-loader!Application.sass';
const defaultStyles = (require('Application.sass'):any).locals.styles;

import Router from 'routerActions';

import renderApplication from './../app.js';


class Application extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    console.info('RENDERING: Application');
    const {props} = this;

    const path = props.state.getIn(['routing', 'path']);
    const primaryRoute = path.get('primary');
    const secondaryRoute = path.get('secondary');
    const notifyRoute = path.get('notify');

    return (
        <div className={defaultStyles}>
          Application view

        </div>
    );
  }
}

export default Application;
