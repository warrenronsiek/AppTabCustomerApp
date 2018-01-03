/**
 * Created by warren on 1/22/17.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, TextInput, StyleSheet, Dimensions, ScrollView} from 'react-native'
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
    minHeight: 800
  },
  textContainer: {
    marginTop: 30,
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 200,
    flexDirection: 'column',
  },
  checkListContainer: {
    flex: 2,
    maxHeight: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInputContainer: {
    flex: 1,
    maxHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    width: width,
  },
  buttonContainer: {
    marginTop: 30,
    flex: 3,
    alignItems: 'center',
  },
  textInputBox: {
    height: 40,
    width: width,
    textAlign: 'center'
  }
});

const register = ({
                    updatePassword, updateConfirmPassword,
                    password, confirmPassword, registerUser, networkError, userExistsError, unknownError,
                    registering, passwordValid
                  }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.textContainer}>
      <View style={[styles.textInputContainer, {borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'grey'}]}>
        <TextInput style={styles.textInputBox} onChangeText={text => updatePassword(text)} autoCapitalize='none'
                   autoCorrect={false} value={password} placeholder="Password" secureTextEntry={true}/>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput style={styles.textInputBox} onChangeText={text => updateConfirmPassword(text)} autoCapitalize='none'
                   autoCorrect={false} value={confirmPassword} placeholder="Confirm Password" secureTextEntry={true}/>
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
        : <View style={{flex:1, flexDirection: 'row'}}>
        <Button onPress={() => registerUser()} title="Register" style={{width: '90%'}}
                  disabled={(password !== confirmPassword) || !passwordValid.isValid}/>
      </View>}
      {(networkError && !registering) ? <Text>Networking Error!</Text> : null}
      {(unknownError && !registering) ? <Text>Unknown Error!</Text> : null}
      {(userExistsError && !registering) ? <Text>User Exists Error!</Text> : null}
    </View>
  </ScrollView>
);

register.propTypes = {
  updatePassword: PropTypes.func.isRequired,
  updateConfirmPassword: PropTypes.func.isRequired,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  registerUser: PropTypes.func.isRequired,
  networkError: PropTypes.bool,
  userExistsError: PropTypes.bool,
  unknownError: PropTypes.bool,
  registering: PropTypes.bool,
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