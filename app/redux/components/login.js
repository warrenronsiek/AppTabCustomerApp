/**
 * Created by warren on 1/22/17.
 */
import React from 'react';
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, TextInput, Dimensions} from 'react-native';
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
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
  },
  welcomeHeadline: {
    fontSize: 26,
    fontWeight: "200",
  },
  textContainer: {
    flex: 2,
    width: width,
    maxHeight: 100
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
  buttonStyle: {
    marginTop: 10,
    height: 70,
    width: '90%'
  }
});

const login = ({validationError, networkError, unknownError, loggingIn, phoneNumber, password, updatePhoneNumber, updatePassword, onLogin, navToRegister, navToPasswordReset}) => (
  <View style={styles.container}>
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeHeadline}>
        Please login/register to proceed.
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
      {!loggingIn ? <Button onPress={() => onLogin(phoneNumber, password)} style={styles.buttonStyle} title="Login"/> : null}
      {!loggingIn ? <Button onPress={navToRegister} style={styles.buttonStyle} title="Register"/> : null}
      {validationError ? <Text>Oops! Wrong username or password!</Text> : null}
      {networkError ? <Text>Networking Error!</Text> : null}
      {unknownError ? <Text>Unknown Error!</Text> : null}
      {loggingIn ? <Spinner style={{marginTop: 20}}/> : null}
      {loggingIn
        ? null
        : <Button onPress={() => navToPasswordReset()} title="Forgot Password" style={styles.buttonStyle}/>}
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
