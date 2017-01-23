/**
 * Created by warren on 1/18/17.
 */
import React, {Component} from 'react';
import Login from '../redux/connectedComponents/login';
const noble = require('react-native-ble'); /** putting this here to turn on noble early and avoid warm-up*/

class LoginScene extends React.Component {
  render() {
    return <Login/>
  }
}

export default LoginScene