/* @flow */
'use strict';
import React from 'react';

import 'style-loader!NavBar.sass';
const defaultStyles = (require('NavBar.sass'):any).locals.styles;

type Props ={
  navLeft: any,
  navTitle: any,
  navRight: any,
}

const Toolbar = (props: Props) => {


  return (
    <div
      className = {'NavBar ' + defaultStyles}>
      <div className = "NavBar--left">
        {props.navLeft}
      </div>
      <div className = "NavBar--title">
        {props.navTitle}
      </div>
      <div className = "NavBar--right">
        {props.navRight}
      </div>
    </div>
  )
};


export default Toolbar;