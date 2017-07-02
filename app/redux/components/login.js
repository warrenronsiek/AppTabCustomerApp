/**
 * Created by warren on 1/22/17.
 */
import React, {PropTypes} from 'react';
import {StyleSheet, Text, View, TextInput, Dimensions, Button as BuiltinButton} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EnytpoIcon from 'react-native-vector-icons/Entypo'
import Spinner from '../../common/spinner'
import Button from '../../common/button'
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 40,
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
    width: width * .6,
    flexDirection: 'row',
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
    paddingLeft: 15,
    flexDirection: 'column',
    flex: 5
  },
  textInputBox: {
    height: 40,
    flex: 1
  },
  buttonContainer: {
    marginTop: 30,
    flex: 4,
    alignItems: 'center',
    paddingBottom: 120
  }
});

const login = ({validationError, networkError, unknownError, loggingIn, phoneNumber, password, updatePhoneNumber, updatePassword, onLogin, navToRegister, navToPasswordReset}) => (
  <View style={styles.container}>
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcome}>
        AppTab
      </Text>
      <Text>
        Alpha 0.2.0
      </Text>
    </View>
    <View style={styles.textContainer}>
      <View style={styles.iconContainer}>
        <View style={styles.iconSubContainer}>
          <MaterialIcon name="phone" size={30}/>
        </View>
        <View style={styles.iconSubContainer}>
          <EnytpoIcon name="key" size={30}/>
        </View>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput style={styles.textInputBox} value={phoneNumber} placeholder="(123) 456-7890" autoCapitalize='none'
                   autoCorrect={false}
                   onChangeText={(text) => updatePhoneNumber(text)}/>

        <TextInput style={styles.textInputBox} value={password} placeholder="password" autoCapitalize='none'
                   autoCorrect={false}
                   onChangeText={(text) => updatePassword(text)}/>
      </View>
    </View>
    <View style={styles.buttonContainer}>
      {!loggingIn ? <Button onPress={() => onLogin(phoneNumber, password)} title="Login" style={{marginBottom:10}}/> : null}
      {!loggingIn ? <Button onPress={navToRegister} title="Register"/> : null}
      {validationError ? <Text>Oops! Wrong username or password!</Text> : null}
      {networkError ? <Text>Networking Error!</Text> : null}
      {unknownError ? <Text>Unknown Error!</Text> : null}
      {loggingIn ? <Spinner/> : null}
      <BuiltinButton onPress={() => navToPasswordReset()} title="Forgot Password"/>
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
