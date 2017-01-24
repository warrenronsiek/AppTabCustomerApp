/**
 * Created by warren on 1/20/17.
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableHighlight, PushNotificationIOS, AsyncStorage} from 'react-native';
import Register from '../redux/connectedComponents/registerConnected'

export default class RegisterScene extends Component {
  render() {
    return (
      <Register/>
    )
  }
}