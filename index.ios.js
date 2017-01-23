import store from './app/redux/store';
import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import {Provider, connect} from 'react-redux';
import {Router, Scene} from 'react-native-router-flux';
import Login from './app/scenes/login';
import Placeholder from './app/scenes/placeholder';
const RouterWithRedux = connect()(Router);

class TabIcon extends Component {
  render() {
    return (
      <Text style={{color: this.props.selected? 'red' : 'black'}}>{this.props.title}</Text>
    )
  }
}

export default class AppTabCustomerApp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
    <Provider store={store()}>
      <RouterWithRedux>
        <Scene key="login" component={Login} title="Login"/>
        <Scene key="placeholder" component={Placeholder} title="Placeholder"/>
      </RouterWithRedux>
    </Provider>
    );
  }
}

AppRegistry.registerComponent('AppTabCustomerApp', () => AppTabCustomerApp);
