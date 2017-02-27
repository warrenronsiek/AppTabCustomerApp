import store from './app/redux/store';
import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import {Provider, connect} from 'react-redux';
import {Router, Scene, Actions, ActionConst} from 'react-native-router-flux';
import Login from './app/scenes/loginScene';
import Placeholder from './app/scenes/placeholder';
import Register from './app/scenes/registerScene';
import Nodes from './app/scenes/nodeScene';
import Request from './app/scenes/serviceRequestScene';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';

const RouterWithRedux = connect()(Router);

class TabIcon extends Component {
  render() {
    return (
      <Text style={{color: this.props.selected? 'red' : 'black'}}>{this.props.title}</Text>
    )
  }
}

class Cocktail extends Component {
  render() {
    return (
      <EntypoIcons name="drink" size={30} color={ this.props.selected ? '#6495ED' : 'black'}/>
    )
  }
}

class Bell extends Component {
  render() {
    return (
      <Ionicon name="ios-notifications" size={40} color={ this.props.selected ? '#6495ED' : 'black'}/>
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
        <Scene key="register" component={Register} title="Register"/>
        <Scene key="nodes" component={Nodes} title="Node Selection"/>
        <Scene key="tabs" tabs={true} onBack={() => Actions.nodes()}>
          <Scene key="request" component={Request} title="Service Request" icon={Bell} initial={true}/>
          <Scene key="placeholder" component={Placeholder} title="Placeholder" icon={Cocktail}/>
        </Scene>
      </RouterWithRedux>
    </Provider>
    );
  }
}

AppRegistry.registerComponent('AppTabCustomerApp', () => AppTabCustomerApp);
