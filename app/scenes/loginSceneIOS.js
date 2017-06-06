/**
 * Created by warren on 1/18/17.
 */
import React, {Component} from 'react';
import {PushNotificationIOS} from 'react-native'
import Login from '../redux/connectedComponents/loginConnected'
import {connect} from 'react-redux'
import {setDeviceToken} from '../redux/actions/loginActions'
const noble = require('react-native-ble'); /** putting this here to turn on noble early and avoid warm-up*/

class LoginScene extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  };

  componentWillMount() {
    PushNotificationIOS.requestPermissions();
    PushNotificationIOS.addEventListener('register', (token) => {
      console.log(token);
      this.props.dispatch(setDeviceToken(token))
    });
  }

  render() {
    return <Login/>
  }
}

export default connect()(LoginScene)