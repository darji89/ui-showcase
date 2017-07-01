/* @flow */
'use strict';
import React from 'react';

import IconButton from 'IconButton';
import View from 'View';

import 'style-loader!CityInfo.sass';
const defaultStyles = (require('CityInfo.sass'):any).locals.styles;

class CityInfo extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    console.info('RENDERING: CityInfo');
    const {props} = this;

    const navLeft = <IconButton
      icon = "back"
    />;

    const navRight = <IconButton
      icon = "add"
    />;


    return (
      <View
        className = {defaultStyles}
        name = "CityInfo"
        navLeft = {navLeft}
        navRight = {navRight}
        navTitle = "Cities">
      CityInfo view
      </View>
    );
  }
}

export default CityInfo;

//  children: Object,
/*className?: string,*/
/*hide?: boolean,*/
/*name?: String,*/
//   navLeft: Array,
//   navRight: Array,
//   navTitle: string,
//   styles?: Object,
//   transition?: boolean,
//   transitionBack? : boolean,
//   transitionName?: string