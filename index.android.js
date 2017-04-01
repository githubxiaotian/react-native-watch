/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Watch from './js/day01/WatchPresenter'

export default class day01 extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Watch />
    );
  }
}

AppRegistry.registerComponent('day01', () => day01);
