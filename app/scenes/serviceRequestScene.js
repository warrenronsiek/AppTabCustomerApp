/**
 * Created by warren on 1/28/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {StyleSheet, View, Button} from 'react-native'
import serviceRequest from '../api/serviceRequestApi'
import logger from '../api/loggingApi'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  }
});

class ServiceRequestScene extends Component {
  static contextTypes = {
    store: PropTypes.object
  };

  constructor(props) {
    super(props)
  }

  _serviceRequest = () => {
    const state = this.context.store.getState();
    const
      activeNode = state.activeNode,
      userName = state.auth.userName;
    serviceRequest({nodeId: activeNode, userName})
      .catch(err => logger('service request error', err))
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this._serviceRequest} title="Service Request"/>
      </View>)
  }
}

export default connect()(ServiceRequestScene)