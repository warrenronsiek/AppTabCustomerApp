/**
 * Created by warren on 1/22/17.
 */
import React, {PropTypes} from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import Spinner from '../../common/spinner'
import Button from '../../common/button'
import PasswordChecklist from './passwordChecklist'
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textContainer: {
    marginTop: 10,
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 200,
    flexDirection: 'column'
  },
  checkListContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInputContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    width: width,
  },
  buttonContainer: {
    flex: 3,
    alignItems: 'center',
  },
  textInputBox: {
    flex: 1,
    height: 40,
    paddingLeft: 30
  }
});

const register = ({
                    updatePhoneNumber, phoneNumber, updateName, updateEmail, updatePassword, updateConfirmPassword,
                    name, email, password, confirmPassword, registerUser, networkError, userExistsError, unknownError,
                    registering, passwordValid
                  }) => (
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <View style={[styles.textInputContainer, {borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'grey'} ]}>
        <TextInput style={styles.textInputBox} onChangeText={text => updateName(text)} autoCapitalize='words'
                   autoCorrect={false} value={name} placeholder="First Name (So servers know what to call you.)"/>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput style={styles.textInputBox} onChangeText={text => updatePhoneNumber(text)} autoCapitalize='words'
                   autoCorrect={false} value={phoneNumber} placeholder="(123) 456-7890" keyboardType='phone-pad'
                   maxLength={14}/>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput style={styles.textInputBox} onChangeText={text => updateEmail(text)} autoCapitalize='none'
                   autoCorrect={false} value={email} placeholder="Email (Optional)"/>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput style={styles.textInputBox} onChangeText={text => updatePassword(text)} autoCapitalize='none'
                   autoCorrect={false} value={password} placeholder="Password"/>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput style={styles.textInputBox} onChangeText={text => updateConfirmPassword(text)} autoCapitalize='none'
                   autoCorrect={false} value={confirmPassword} placeholder="Confirm Password"/>
      </View>
    </View>
    <View style={styles.checkListContainer}>
      {!registering &&
      <PasswordChecklist hasLower={passwordValid.hasLower} hasUpper={passwordValid.hasUpper}
                         hasDigit={passwordValid.hasDigit} hasSymbol={passwordValid.hasSymbol}
                         hasLength={passwordValid.hasLength} matches={confirmPassword && (password === confirmPassword)}/>}
    </View>
    <View style={styles.buttonContainer}>
      {registering
        ? <Spinner/>
        : <Button onPress={() => registerUser(name, email, password, phoneNumber)} title="Register"
                  disabled={(password !== confirmPassword) || name === undefined || !passwordValid.isValid || phoneNumber.length !== 14}/>}
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
  updatePhoneNumber: PropTypes.func.isRequired,
  passwordValid: PropTypes.shape({
    hasLower: PropTypes.bool,
    hasUpper: PropTypes.bool,
    hasDigit: PropTypes.bool,
    hasSymbol: PropTypes.bool,
    hasLength: PropTypes.bool,
    matches: PropTypes.bool
  })
};
export default register