import VenueList from '../redux/connectedComponents/venueListConnected'
import React, {Component} from "react";
import {componentDidMount, componentWillMount, nobleGetState} from "../common/bleScannerComponentFunctions";
import {connect} from 'react-redux';
import {setDeviceToken} from '../redux/actions/loginActions'
import PushNotification from 'react-native-push-notification'

class VenueScene extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    componentWillMount();
    let that = this;
    PushNotification.configure({
      onRegister: function (token) {
        that.props.dispatch(setDeviceToken(token))
      }
    });
    this.reconstruct();
  }

  componentDidMount() {
    componentDidMount();
  }

  reconstruct = () => {
    if (this.props.bluetoothReconstruction) {
      setTimeout(this.reconstruct, 2000);
      if (nobleGetState() !== 'poweredOn') {
        componentDidMount();
      }
    }
  };

  render() {
    return (
      <VenueList/>
    )
  }
}

const mapStateToProps = state => ({
  bluetoothReconstruction: state.bluetoothReconstruction
});

export default connect(mapStateToProps)(VenueScene)