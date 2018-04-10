import VenueList from '../redux/connectedComponents/venueListConnected'
import React, {Component} from "react";
import {componentDidMount, stopScanning} from "../common/bleScannerComponentFunctions";
import {connect} from 'react-redux';
import {setDeviceToken} from '../redux/actions/loginActions'
import PushNotification from 'react-native-push-notification'
import {Alert, PermissionsAndroid, Platform} from 'react-native'
import logger from '../api/loggingApi'
class VenueScene extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let that = this;
    PushNotification.configure({
      onRegister: function (token) {
        that.props.dispatch(setDeviceToken(token))
      }
    });
    if (Platform.OS === 'android') {
      const permissionsMessage = {
        title: 'Location Permissions',
        message: 'AppTab uses bluetooth to discover what restaurant you are in. Without this, we cant find your menu.'
      };
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
        .then(res => {
          if (!res) {
            return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, permissionsMessage)
          }
        })
        .then(res => componentDidMount())
        .catch(err => logger('androidBLEError', err))
    }

    setTimeout(() => {
      if (this.props.venues.length === 0) {
        Alert.alert('No Venues in Range',
          "Looks like you aren't in range of a venue using AppTab. Please consider telling your waiter that they should install our app!",
          [])
      }
    }, 20000)
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      componentDidMount();
    }
  }

  componentWillUnmount() {
    stopScanning()
  }

  render() {
    return (
      <VenueList/>
    )
  }
}

const mapStateToProps = state => ({
  bluetoothReconstruction: state.bluetoothReconstruction,
  venues: state.venues
});

export default connect(mapStateToProps)(VenueScene)