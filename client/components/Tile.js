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
  thumbnail : Object,
  title?: string
};

function Tile (props: Props) {
  console.info('rendering: ', 'Tile');
  const {caption, onClick, style, thumbnail, title} = props;

  let className = props.className
    ? props.className + ' ' + defaultStyles
    : defaultStyles;

  let styles = style && Object.assign({}, style) || {};

  thumbnail
    ? styles.backgroundImage = 'url(' + thumbnail + ')'
    : null;

  return (
        <div
          className = {className}
          onClick={onClick}
          style = {styles}>
          <h2>{title}</h2>
          <span>{caption}</span>
        </div>
    )
}

export default Tile;