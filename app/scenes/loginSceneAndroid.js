/**
 * Created by warren on 1/18/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Login from '../redux/connectedComponents/loginConnected'
import {connect} from 'react-redux'
import {setDeviceToken} from '../redux/actions/loginActions'
import PushNotification from 'react-native-push-notification'
import {BluetoothStatus} from 'react-native-bluetooth-status'

const noble = require('react-native-ble');

/** putting this here to turn on noble early and avoid warm-up*/

class LoginScene extends Component {
  static contextTypes = {
    store: PropTypes.object
  };

  componentWillMount() {
    PushNotification.configure({
      onRegister: function(token) {
        console.log( 'TOKEN:', token );
        this.props.dispatch(setDeviceToken(token))
      }
    })
  }

  componentDidMount() {
    BluetoothStatus.state()
      .then(res => {
        if (!res) {
          alert('Your phone\'s bluetooth is turned off.\nThe app won\'t be able to detect tables until it is turned on.');
        }
      })
  }

  render() {
    return <Login/>
  }
}

export default connect()(LoginScene)