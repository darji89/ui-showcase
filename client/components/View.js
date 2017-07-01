/* @flow */
'use strict';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import 'style-loader!View.sass';
const defaultStyles = (require('View.sass'):any).locals.styles;

import NavBar from 'NavBar';

type Props = {
  children: Object,
  className?: string,
  hide?: boolean,
  name?: String,
  navLeft: Array,
  navRight: Array,
  navTitle: string,
  styles?: Object,
  transition?: boolean,
  transitionBack? : boolean,
  transitionName?: string
}

function View (props: Props) {
  const {children, styles} = props;

  const innerStyle = styles ? styles : {};

  let content;

  if (Array.isArray(children)) {
    content = children.map(child => {
      return child
    });
  }

  else if (typeof(children) === 'string') {
    content = children;
  }

  else if (typeof(children) === 'number') {
    content = children;
  }

  else if (typeof(children) === 'object') {
    content = children;
  }
  else if (typeof(children) === 'boolean' || typeof(children) === 'undefined') {
    content = null
  }
  else {
    console.warn('Type of children is unknown. Check View.js component');
    content = 'PlEASE SUPPLY THE VIEW A CHILD OF THE FOLOWING TYPE: Array, string, number or Object';
  }

  let className = props.className
    ? props.className + ' ' + defaultStyles
    : defaultStyles;

  const navBar = props.navLeft || props.navTitle || props.navRight
    ? <NavBar
      navLeft = {props.navLeft ? props.navLeft : null}
      navRight = {props.navRight ? props.navRight : null}
      navTitle = {props.navTitle ? props.navTitle : null}/>
    : null;

  props.transitionBack
    ? className = className + ' transitionBack'
    : null;

  const standardView = !props.hide
    ? <div
      className={className}
      key = {props.name}
      onClick = { e => {
        e.stopPropagation();
      }}>
        {navBar}
        <div
          className="View--Inner"
          style={innerStyle}>
          {content}
        </div>
      </div>
    : null;

  let transitionName = props.transitionName
  ? 'viewTransition_' + props.transitionName
  : 'viewTransition';

  !props.transitionName && props.transitionBack
    ? transitionName = transitionName + 'Back'
    : null;

  const transitionView = <ReactCSSTransitionGroup

    className = {props.name}
    transitionAppearTimeout = {350}
    transitionEnterTimeout = {350}
    transitionLeaveTimeout = {350}
    transitionName = {transitionName}>
      {standardView}
  </ReactCSSTransitionGroup>;

  const view = props.transition
    ? transitionView
    : standardView;

  return (view)

}

export default View;