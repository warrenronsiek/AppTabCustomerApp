/**
 * Created by warren on 1/22/17.
 */
import React, {PropTypes} from 'react';
import {View, Button, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EnytpoIcon from 'react-native-vector-icons/Entypo'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
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
    justifyContent: 'center',
  },
  textContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * .6,
    flexDirection: 'row'
  },
  textInputContainer: {
    flex: 4,
    flexDirection: 'column'
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  iconSubContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1
  },
  textInputBox: {
    flex: 1,
    height: 40
  }
});

const register = ({updateName, updateEmail, updatePassword, updateConfirmPassword, name, email, password, confirmPassword, registerUser, networkError, userExistsError, unknownError, registering}) => (
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
          <EvilIcon name="user" size={30}/>
        </View>
        <View style={styles.iconSubContainer}>
          <MaterialIcon name="email" size={30}/>
        </View>
        <View style={styles.iconSubContainer}>
          <EnytpoIcon name="key" size={30}/>
        </View>
        <View style={styles.iconSubContainer}>
          <EnytpoIcon name="key" size={30}/>
        </View>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput style={styles.textInputBox} onChangeText={text => updateName(text)} autoCapitalize='words'
                   autoCorrect={false} value={name} defaultValue="your name"/>
        <TextInput style={styles.textInputBox} onChangeText={text => updateEmail(text)} autoCapitalize='none'
                   autoCorrect={false} value={email} defaultValue="email"/>
        <TextInput style={styles.textInputBox} onChangeText={text => updatePassword(text)} autoCapitalize='none'
                   autoCorrect={false} value={password} defaultValue="password"/>
        <TextInput style={styles.textInputBox} onChangeText={text => updateConfirmPassword(text)} autoCapitalize='none'
                   autoCorrect={false} value={confirmPassword} defaultValue="confirm password"/>
      </View>
    </View>
    <View style={styles.buttonContainer}>
      <Button onPress={() => registerUser(name, email, password)} title="Register"/>
      {password === confirmPassword
        ? <Text>Passwords Match!</Text>
        : <Text>Passwords dont match!</Text>}
      {networkError ? <Text>Networking Error!</Text> : null}
      {unknownError ? <Text>Unknown Error!</Text> : null}
      {userExistsError ? <Text>User Exists Error!</Text> : null}
      {registering ? <Text>Registering you now...</Text> : null}
    </View>
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