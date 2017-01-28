/**
 * Created by warren on 1/28/17.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {StyleSheet, Text, View, Button} from 'react-native';
import serviceRequest from '../api/serviceRequestApi';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  }
});

class ServiceRequestScene extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  };

  constructor(props) {
    super(props)
  }

  _serviceRequest = () => {
    const activeNode = this.context.store.getState().activeNode;
    serviceRequest({nodeId: activeNode})
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this._serviceRequest} title="Service Request"/>
      </View>)
  }
}

export default connect()(ServiceRequestScene)