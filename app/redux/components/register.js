/**
 * Created by warren on 1/22/17.
 */
import React, {PropTypes} from 'react';
import {View, Button, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EnytpoIcon from 'react-native-vector-icons/Entypo'
import Spinner from '../../common/spinner'
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60
  },
  textContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * .6,
    flexDirection: 'row',
    maxHeight: 150
  },
  textInputContainer: {
    flex: 4,
    flexDirection: 'column'
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  iconSubContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 3,
    marginTop: 30,
    alignItems: 'center',
  },
  textInputBox: {
    flex: 1,
    height: 40
  }
});


const register = ({
                    updatePhoneNumber, phoneNumber, updateName, updateEmail, updatePassword, updateConfirmPassword,
                    name, email, password, confirmPassword, registerUser, networkError, userExistsError, unknownError,
                    registering
                  }) => (
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
          <EnytpoIcon name="user" size={30}/>
        </View>
        <View style={styles.iconSubContainer}>
          <MaterialIcon name="phone" size={30}/>
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
                   autoCorrect={false} value={name} placeholder="your name"/>
        <TextInput style={styles.textInputBox} onChangeText={text => updatePhoneNumber(text)} autoCapitalize='words'
                   autoCorrect={false} value={phoneNumber} placeholder="(123) 456-7890" keyboardType='phone-pad'/>
        <TextInput style={styles.textInputBox} onChangeText={text => updateEmail(text)} autoCapitalize='none'
                   autoCorrect={false} value={email} placeholder="email (optional)"/>
        <TextInput style={styles.textInputBox} onChangeText={text => updatePassword(text)} autoCapitalize='none'
                   autoCorrect={false} value={password} placeholder="password"/>
        <TextInput style={styles.textInputBox} onChangeText={text => updateConfirmPassword(text)} autoCapitalize='none'
                   autoCorrect={false} value={confirmPassword} placeholder="confirm password"/>
      </View>
    </View>
    <View style={styles.buttonContainer}>
      {registering
        ? <Spinner/>
        : <Button onPress={() => registerUser(name, email, password, phoneNumber)} title="Register"
                  disabled={(password !== confirmPassword) || name === undefined || password === undefined || phoneNumber.length !== 14}/>}
      {(password === confirmPassword) && password !== undefined && !registering
        ? <Text>Passwords Match!</Text>
        : <Text>Passwords dont match!</Text>}
      {(networkError && !registering) ? <Text>Networking Error!</Text> : null}
      {(unknownError && !registering) ? <Text>Unknown Error!</Text> : null}
      {(userExistsError && !registering) ? <Text>User Exists Error!</Text> : null}
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
  registering: PropTypes.bool,
  phoneNumber: PropTypes.string,
  updatePhoneNumber: PropTypes.func.isRequired
};
export default register