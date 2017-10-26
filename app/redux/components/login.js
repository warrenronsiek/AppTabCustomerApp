/**
 * Created by warren on 1/22/17.
 */
import React from 'react';
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, TextInput, Dimensions, Image} from 'react-native';
import Spinner from '../../common/spinner'
import Button from '../../common/button'

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  welcomeContainer: {
    flex: 2,
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textContainer: {
    flex: 2,
    width: width,
    maxHeight: 100
  },
  iconContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconSubContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'grey',
    flex: 1
  },
  textInputBox: {
    height: 40,
    flex: 1,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    flex: 5,
    alignItems: 'center',
    paddingBottom: 120
  },
  buttonSubContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1
  }
});

const login = ({validationError, networkError, unknownError, loggingIn, phoneNumber, password, updatePhoneNumber, updatePassword, onLogin, navToRegister, navToPasswordReset}) => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image style={{width: 150, height: 150}} source={require('../../assets/images/apptab_logo_circle.png')}/>
    </View>
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcome}>
        AppTab
      </Text>
    </View>
    <View style={styles.textContainer}>
      <View style={styles.textInputContainer}>
        <TextInput style={styles.textInputBox} value={phoneNumber} placeholder="(123) 456-7890" autoCapitalize='none'
                   autoCorrect={false} keyboardType='phone-pad'
                   onChangeText={(text) => updatePhoneNumber(text)}/>
      </View>
      <View style={[styles.textInputContainer, {borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'grey',}]}>
        <TextInput style={styles.textInputBox} value={password} placeholder="password" autoCapitalize='none'
                   autoCorrect={false} secureTextEntry={true}
                   onChangeText={(text) => updatePassword(text)}/>
      </View>
    </View>
    <View style={styles.buttonContainer}>
      <View style={styles.buttonSubContainer}>

      {!loggingIn ?
        <Button onPress={() => onLogin(phoneNumber, password)} title="Login" style={{marginRight: 10}}/> : null}
      {!loggingIn ? <Button onPress={navToRegister} title="Register"/> : null}
      </View>
      {validationError ? <Text>Oops! Wrong username or password!</Text> : null}
      {networkError ? <Text>Networking Error!</Text> : null}
      {unknownError ? <Text>Unknown Error!</Text> : null}
      {loggingIn ? <Spinner/> : null}
      <Button onPress={() => navToPasswordReset()} title="Forgot Password" style={{marginTop: 10, width: 170}}/>
    </View>
  </View>
);

login.propTypes = {
  validationError: PropTypes.bool,
  networkError: PropTypes.bool,
  unknownError: PropTypes.bool,
  loggingIn: PropTypes.bool,
  phoneNumber: PropTypes.string,
  password: PropTypes.string,
  updatePhoneNumber: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  navToRegister: PropTypes.func.isRequired,
  navToPasswordReset: PropTypes.func.isRequired
};

export default login
