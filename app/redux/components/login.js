/**
 * Created by warren on 1/22/17.
 */
import React, {PropTypes} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, TextInput, AsyncStorage, Button, Dimensions} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EnytpoIcon from 'react-native-vector-icons/Entypo'
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  welcomeContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textContainer: {
    flex: 1,
    width: width * .6,
    flexDirection: 'row'
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
    flex: 2,
  }
});

const login = ({validationError, networkError, unknownError, loggingIn, email, password, updateEmail, updatePassword, onLogin, navToRegister}) => (
  <View style={styles.container}>
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcome}>
        AppTab
      </Text>
      <Text>
        Alpha 0.1.0
      </Text>
    </View>
    <View style={styles.textContainer}>
      <View style={styles.iconContainer}>
        <View style={styles.iconSubContainer}>
          <MaterialIcon name="email" size={30}/>
        </View>
        <View style={styles.iconSubContainer}>
          <EnytpoIcon name="key" size={30}/>
        </View>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput style={styles.textInputBox} value={email} defaultValue="email address" autoCapitalize='none'
                   autoCorrect={false}
                   onChangeText={(text) => updateEmail(text)}/>

        <TextInput style={styles.textInputBox} value={password} defaultValue="password" autoCapitalize='none'
                   autoCorrect={false}
                   onChangeText={(text) => updatePassword(text)}/>
      </View>
    </View>
    <View style={styles.buttonContainer}>
      <Button onPress={() => onLogin(email, password)} title="Login"/>
      <Button onPress={navToRegister} title="Register"/>
      {validationError ? <Text>Oops! Wrong username or password!</Text> : null}
      {networkError ? <Text>Networking Error!</Text> : null}
      {unknownError ? <Text>Unknown Error!</Text> : null}
      {loggingIn ? <Text>Powering up Login Gremlins</Text> : null}
    </View>
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
