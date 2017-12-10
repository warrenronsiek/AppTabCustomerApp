import VenueList from '../redux/connectedComponents/venueListConnected'
import React, {Component} from "react";
import {componentDidMount, componentWillMount} from "../common/bleScannerComponentFunctions";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {setDeviceToken} from '../redux/actions/loginActions'
import PushNotification from 'react-native-push-notification'

class VenueScene extends Component {
  static contextTypes = {
    store: PropTypes.object
  };

  componentWillMount() {
    componentWillMount();
    let that = this;
    PushNotification.configure({
      onRegister: function (token) {
        that.props.dispatch(setDeviceToken(token))
      }
    });
  }

  componentDidMount() {
    componentDidMount();
  }

  render() {
    return (
      <VenueList/>
    )
  }
}

export default connect()(VenueScene)