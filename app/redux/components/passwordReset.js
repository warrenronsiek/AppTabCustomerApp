/**
 * Created by warren on 6/20/17.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, TextInput, StyleSheet, Dimensions, ScrollView} from 'react-native'
import Button from '../../common/button'
import Spinner from '../../common/spinner'
import PasswordChecklist from './passwordChecklist'
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingTop: 20,
    minHeight: 900
  },
  textInputBarContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: width * .3,
    marginRight: width * .3,
    maxHeight: 150,
  },
  textInputContainer: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40
  },
  iconSubContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 20,
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxHeight: 300
  },
  buttonSubContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textInput: {
    flex: 3,
    height: 40,
    paddingLeft: 40
  },
  instructionsContainer: {
    alignItems: 'center',
    marginBottom: 40
  },
  inputContainer: {
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    maxHeight: 40
  },
  buttonStyle: {
    width: '90%',
    marginTop: 10
  }
});

const renderButton = (stage, code, phoneNumber, password, submitPhoneNumber, submitCodePassword, resendCode, confirmPassword, passwordValid) => {
  switch (stage) {
    case 'phoneNumber':
      return (
        <Button onPress={() => submitPhoneNumber(phoneNumber)} style={styles.buttonStyle}
                disabled={!phoneNumber ? true : phoneNumber.length !== 14}
                title="Done"/>
      );
    case 'codePassword':
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Button onPress={() => submitCodePassword(code, password, phoneNumber)} title="Done" style={styles.buttonStyle}
                  disabled={(() => {
                    if (!code) {
                      return true
                    } else {
                      return !((code.length === 6) && passwordValid.isValid && (password === confirmPassword))
                    }
                  })()}/>
          <Button onPress={() => resendCode(phoneNumber)} style={styles.buttonStyle}
                         title="Resend Confirmation Code"/>
        </View>
      )
  }
};

const passwordReset = ({
                         password, phoneNumber, code, updatePassword, updatePhoneNumber, updateCode, processing,
                         submitPhoneNumber, submitCodePassword, stage, resendCode, confirmPassword, updateConfirmPassword,
                         passwordValid, wrongCodeError, unknownError
                       }) => (
  <ScrollView contentContainerStyle={styles.container}>
    {stage === 'phoneNumber'
      && <View style={styles.instructionsContainer}>
        <Text>Please enter your phone number</Text>
        <Text>so we can send you a confirmation sms.</Text>
      </View>}

    <View style={styles.textInputBarContainer}>

      {stage === 'phoneNumber' && (
        <View style={[styles.inputContainer, {borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'grey'}]}>
          <View style={styles.textInputContainer}>
            <TextInput value={phoneNumber} placeholder="(123) 456-7890" onChangeText={text => updatePhoneNumber(text)}
                       autoCapitalize='none' autoCorrect={false} style={[styles.textInput, {textAlign: 'center', paddingLeft: 0}]} keyboardType='number-pad'
                       maxLength={14}/>
          </View>
        </View>
      )}
      {stage === 'codePassword' && (
        <View style={[styles.inputContainer,  {borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'grey'}]}>
          <View style={[styles.textInputContainer]}>
            <TextInput value={code} placeholder="123456 (the code from the sms)" onChangeText={text => updateCode(text)}
                       autoCapitalize='none' autoCorrect={false} style={styles.textInput} keyboardType='number-pad'
                       maxLength={6}/>
          </View>
        </View>
      )}
      {stage === 'codePassword' && (
        <View style={[styles.inputContainer]}>
          <View style={[styles.textInputContainer]}>
            <TextInput value={password} placeholder="enter new password" onChangeText={text => updatePassword(text)}
                       autoCapitalize='none' autoCorrect={false} style={styles.textInput} keyboardType='default'
                       maxLength={30} secureTextEntry={true}/>
          </View>
        </View>
      )}
      {stage === 'codePassword' && (
        <View style={[styles.inputContainer]}>
          <View style={[styles.textInputContainer]}>
            <TextInput value={confirmPassword} placeholder="confirm password" onChangeText={text => updateConfirmPassword(text)}
                       autoCapitalize='none' autoCorrect={false} style={styles.textInput} keyboardType='default'
                       maxLength={30} secureTextEntry={true}/>
          </View>
        </View>
      )}
    </View>
    {stage === 'codePassword' &&
    <PasswordChecklist matches={confirmPassword && (password === confirmPassword)} hasLength={passwordValid.hasLength}
                       hasSymbol={passwordValid.hasSymbol} hasDigit={passwordValid.hasDigit}
                       hasUpper={passwordValid.hasUpper} hasLower={passwordValid.hasLower}/>
    }
    <View style={styles.buttonContainer}>
      <View style={styles.buttonSubContainer}>
      {!processing
        ? renderButton(stage, code, phoneNumber, password, submitPhoneNumber, submitCodePassword, resendCode, confirmPassword, passwordValid)
        : <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}><Spinner style={{marginTop: 20}}/></View>}
      {wrongCodeError
        ? <Text>Looks like you entered the wrong code!</Text>
        : null}
      {unknownError
        ? <Text>Unknown error. Please try again.</Text>
        : null}
      </View>
    </View>
  </ScrollView>
);

passwordReset.propTypes = {
  password: PropTypes.string,
  phoneNumber: PropTypes.string,
  code: PropTypes.string,
  updatePassword: PropTypes.func.isRequired,
  updatePhoneNumber: PropTypes.func.isRequired,
  updateCode: PropTypes.func.isRequired,
  processing: PropTypes.bool,
  submitPhoneNumber: PropTypes.func.isRequired,
  submitCodePassword: PropTypes.func.isRequired,
  stage: PropTypes.string,
  resendCode: PropTypes.func.isRequired,
  confirmPassword: PropTypes.string,
  updateConfirmPassword: PropTypes.func.isRequired,
  passwordValid: PropTypes.shape({
    hasLower: PropTypes.bool,
    hasUpper: PropTypes.bool,
    hasDigit: PropTypes.bool,
    hasSymbol: PropTypes.bool,
    hasLength: PropTypes.bool,
  }),
  wrongCodeError: PropTypes.bool,
  unknownError: PropTypes.bool
};

export default passwordReset