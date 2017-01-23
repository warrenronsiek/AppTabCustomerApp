/**
 * Created by warren on 1/22/17.
 */
import React, {PropTypes} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, TextInput, AsyncStorage, Button} from 'react-native';

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

const login = ({validationError, networkError, unknownError, loggingIn, email, password, updateEmail, updatePassword, onLogin, navToRegister}) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to AppTab Client Super Alpha!
    </Text>
    <Text style={styles.instructions}>
      Please Login below:
    </Text>
    <TextInput style={styles.textInputBox} value={email} defaultValue="email address" autoCapitalize='none'
               autoCorrect={false}
               onChangeText={(text) => updateEmail(text)}/>
    <TextInput style={styles.textInputBox} value={password} defaultValue="password" autoCapitalize='none'
               autoCorrect={false}
               onChangeText={(text) => updatePassword(text)}/>
    <Button onPress={() => onLogin(email, password)} title="Login"/>
    <Button onPress={navToRegister} title="Register"/>
    {validationError ? <Text>Oops! Wrong username or password!</Text> : null}
    {networkError ? <Text>Networking Error!</Text> : null}
    {unknownError ? <Text>Unknown Error!</Text> : null}
    {loggingIn ? <Text>Powering up Login Gremlins</Text> : null}
  </View>
);

login.propTypes = {
  validationError: PropTypes.bool,
  networkError: PropTypes.bool,
  unknownError: PropTypes.bool,
  loggingIn: PropTypes.bool,
  email: PropTypes.string,
  password: PropTypes.string,
  updateEmail: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  navToRegister: PropTypes.func.isRequired
};

export default login