/* @flow */
'use strict';
import React from 'react';

import 'style-loader!Tile.sass';
const defaultStyles = (require('Tile.sass'):any).locals.styles;

type Props ={
  caption?: string,
  className? : string,
  onClick : Function,
  style? : Object,
  title?: string
};

function Tile (props: Props) {
  console.info('rendering: ', 'Tile');
  const {caption, onClick, style, title} = props;

  let className = props.className
    ? props.className + ' ' + defaultStyles
    : defaultStyles;

  return (
        <div
          className = {className}
          onClick={props.onClick}>
          <h2>{title}</h2>
          <span>{caption}</span>
        </div>
    )
}

export default Tile;