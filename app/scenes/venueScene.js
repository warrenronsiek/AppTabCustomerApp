import VenueList from '../redux/connectedComponents/venueListConnected'
import React, {Component} from "react";
import {componentDidMount, stopScanning} from "../common/bleScannerComponentFunctions";
import {connect} from 'react-redux';
import {setDeviceToken} from '../redux/actions/loginActions'
import PushNotification from 'react-native-push-notification'
import {Alert} from 'react-native'

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
    setTimeout(() => {
      if (this.props.venues.length === 0) {
        Alert.alert('No Venues in Range',
          "Looks like you aren't in range of a venue using AppTab. Please consider telling your waiter that they should install our app!",
          [])
      }
    }, 20000)
  }

  componentDidMount() {
    componentDidMount();
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