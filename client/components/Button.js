/* @flow */
'use strict';
import React from 'react';

import 'style!Button.sass';
const defaultStyles = (require('Button.sass'):any).locals.styles;

type Props ={
  className? : string,
  label : string,
  onClick : Function,
  style? : Object,
  secondary? : Boolean
};

function Button (props: Props) {
  const {label, onClick, style} = props;
  // console.info('rendering: ', 'Button');

  let className = props.className
    ? props.className + ' ' + defaultStyles
    : defaultStyles;

  props.secondary
    ? className = className + ' secondary'
    : null;

  return (
        <button
          className = {className}
          onClick = {onClick}
          style = {style}>
            <span>
              {label}
            </span>
        </button>
    )
}

export default Button;