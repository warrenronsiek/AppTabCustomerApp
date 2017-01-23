/**
 * Created by warren on 1/20/17.
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableHighlight, PushNotificationIOS, AsyncStorage} from 'react-native';
import registrationRequest from '../api/register';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textInputBox: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40
  }
});

export default class RegistrationScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'wronsiek@gmail.com',
      name: 'Warren',
      password: 'P@33word',
      passwordConfirm: 'P@33word',
      networkError: false,
      unknownError: false,
      userExistsError: false
    };
  }

  _registerUser = () => {
    registrationRequest(this.state.email, this.state.name, this.state.password)
      .then((res) => {
        Actions.venueSelection()
      })
      .catch((err) => {
        switch (err.name) {
          case ('NetworkError'):
            this.setState({networkError: true});
            break;
          case ('UnknownError'):
            console.log(err.name);
            this.setState({unknownError: true});
            break;
          case ('UserExistsError'):
            this.setState({userExistsError: true});
            break;
          default:
            this.setState({unknownError: true});
        }
      })
  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Please enter your registration information:
        </Text>
        <TextInput style={styles.textInputBox} onChangeText={(text) => {
          this.setState({name: text})
        }} autoCapitalize='words' autoCorrect={false} defaultValue="your name"/>
        <TextInput style={styles.textInputBox} onChangeText={(text) => {
          this.setState({email: text})
        }} autoCapitalize='none' autoCorrect={false} defaultValue="email"/>
        <TextInput style={styles.textInputBox} onChangeText={(text) => {
          this.setState({password: text})
        }} autoCapitalize='none' autoCorrect={false} defaultValue="password"/>
        <TextInput style={styles.textInputBox} onChangeText={(text) => {
          this.setState({passwordConfirm: text})
        }} autoCapitalize='none' autoCorrect={false} defaultValue="confirm password"/>
        <Button onPress={this._registerUser} title="Register"/>
        {this.state.password === this.state.passwordConfirm
          ? <Text>Passwords Match!</Text>
          : <Text>Passwords dont match!</Text>}
        {this.state.networkError ? <Text>Networking Error!</Text> : null}
        {this.state.unknownError ? <Text>Unknown Error!</Text> : null}
        {this.state.userExistsError ? <Text>User Exists Error!</Text> : null}
      </View>
    );
  }
}