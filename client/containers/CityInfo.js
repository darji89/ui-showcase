/* @flow */
'use strict';
import React from 'react';

import IconButton from 'IconButton';
import Tile from 'Tile';
import View from 'View';

import 'style-loader!CityInfo.sass';
const defaultStyles = (require('CityInfo.sass'):any).locals.styles;

const defaultState = {
  selected: null
};

const collection = [
  {
    id: 10,
    name: 'New York',
    caption: 'The world that never sleeps',
    thumbnail: '../assets/jpg/newYork2.jpg'
  },
  {
    id: 1,
    name: 'Stockholm',
    caption: '-',
    thumbnail: '../assets/jpg/stockholm2.jpg'
  },
  {
    id: 2,
    name: 'Amsterdam',
    caption: 'Where drugs are legal',
    thumbnail: '../assets/jpg/amsterdam2.jpg'
  },
  {
    id: 30,
    name: 'New York',
    caption: 'The world that never sleeps',
    thumbnail: '../assets/jpg/newYork2.jpg'
  },
  {
    id: 4,
    name: 'Sweden',
    caption: '-',
    thumbnail: '../assets/jpg/stockholm2.jpg'
  },
  {
    id: 5,
    name: 'Amsterdam',
    caption: 'Where drugs are legal',
    thumbnail: '../assets/jpg/amsterdam2.jpg'
  }
];

class CityInfo extends React.Component {
  constructor (props) {
    super(props);
    this.state = defaultState;
  }

  handleTileClick = (id) => {
    this.setState({selected: id})
  };

  handleDeselect = () => {
    this.setState({selected: null})
  };

  render () {
    console.info('RENDERING: CityInfo');
    const {state} = this;

    const tilesViewNavLeft = <IconButton
      icon = "back"
    />;

    const navRight = <IconButton
      icon = "add"
    />;

    const detailViewNavLeft = <IconButton
      icon = "back"
      onClick = {this.handleDeselect}
    />;

    return (
      <div
        className = {'CityInfoView ' + defaultStyles}>
        <View
          className = "TilesView"
          name = "TilesView"
          navLeft = {tilesViewNavLeft}
          navRight = {navRight}
          navTitle = {!state.selected ? 'Cities' : ''}>
          <div className={state.selected ? 'tilesList tileSelected' : 'tilesList'}>
            {collection.map(tile => {
              return <Tile
                caption = {tile.caption}
                className = {state.selected === tile.id ? 'selected' : ''}
                key = {tile.id}
                onClick = {() =>this.handleTileClick(tile.id)}
                thumbnail = {tile.thumbnail}
                title = {tile.name}
              />
            })}
          </div>
        </View>

        <View
          transition
          className = "DetailView"
          hide = {!state.selected }
          name = "DetailView"
          navLeft = {detailViewNavLeft}
          navTitle = {'Details'}
          transitionName = "pop">
          <div
            className="detailView__hero"
            style={state.selected ?{backgroundImage: 'url(' + collection.find(item => state.selected === item.id).thumbnail + ')'} : null}>

          </div>
        </View>

      </div>
    );
  }
}

export default CityInfo;

//aption?: string,
// className? : string,
//   onClick : Function,
//   style? : Object,
//   title?: string