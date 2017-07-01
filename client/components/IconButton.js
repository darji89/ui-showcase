/* @flow */
'use strict';
import React from 'react';

import 'style-loader!IconButton.sass';
const defaultStyles = (require('IconButton.sass'):any).locals.styles;

type Props ={
  className? : string,
  icon: string,
  label? : string,
  onClick : Function,
  style? : Object
};

function IconButton (props: Props) {
  const {onClick, style} = props;
  // console.info('rendering: ', 'IconButton');

  let className = props.className
    ? props.className + ' ' + defaultStyles
    : defaultStyles;

  props.icon
    ? className = className + ' Icon-' + props.icon
    : null;

  const label = props.label
    ? <span>{props.label}</span>
    : null;

  return (
        <button
          className = {className}
          onClick = {onClick}
          style = {style}>
            {label}
        </button>
    )
}

export default IconButton;