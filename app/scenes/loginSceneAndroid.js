/**
 * Created by warren on 1/18/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Login from '../redux/connectedComponents/loginConnected'
import {connect} from 'react-redux'
import {setDeviceToken} from '../redux/actions/loginActions'
import PushNotification from 'react-native-push-notification'

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

  render() {
    return <Login/>
  }
}

export default connect()(LoginScene)