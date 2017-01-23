/**
 * Created by warren on 1/22/17.
 */
import React, {PropTypes} from 'react';
import {View, Button, Text, TextInput, StyleSheet} from 'react-native';

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

const register = ({updateName, updateEmail, updatePassword, updateConfirmPassword, name, email, password, confirmPassword, registerUser, networkError, userExistsError, unknownError, registering}) => (
  <View style={styles.container}>
    <Text style={styles.instructions}>
      Please enter your registration information:
    </Text>
    <TextInput style={styles.textInputBox} onChangeText={text => updateName(text)} autoCapitalize='words'
               autoCorrect={false} value={name} defaultValue="your name"/>
    <TextInput style={styles.textInputBox} onChangeText={text => updateEmail(text)} autoCapitalize='none'
               autoCorrect={false} value={email} defaultValue="email"/>
    <TextInput style={styles.textInputBox} onChangeText={text => updatePassword(text)} autoCapitalize='none'
               autoCorrect={false} value={password} defaultValue="password"/>
    <TextInput style={styles.textInputBox} onChangeText={text => updateConfirmPassword(text)} autoCapitalize='none'
               autoCorrect={false} value={confirmPassword} defaultValue="confirm password"/>
    <Button onPress={() => registerUser(name, email, password)} title="Register"/>
    {password === confirmPassword
      ? <Text>Passwords Match!</Text>
      : <Text>Passwords dont match!</Text>}
    {networkError ? <Text>Networking Error!</Text> : null}
    {unknownError ? <Text>Unknown Error!</Text> : null}
    {userExistsError ? <Text>User Exists Error!</Text> : null}
    {registering ? <Text>Registering you now...</Text> : null}
  </View>
);

register.propTypes = {
  updateName: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  updateConfirmPassword: PropTypes.func.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  registerUser: PropTypes.func.isRequired,
  networkError: PropTypes.bool,
  userExistsError: PropTypes.bool,
  unknownError: PropTypes.bool,
  registering: PropTypes.bool
};

export default register