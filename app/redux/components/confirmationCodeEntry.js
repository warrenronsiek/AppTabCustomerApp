/**
 * Created by warren on 6/16/17.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, TextInput, StyleSheet, Button as BuiltinButton, Dimensions} from 'react-native'
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
  buttonContainer: {
    flex: 1,
    marginTop: 20
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'grey',
    maxHeight: 40,
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  textInputBox: {
    height: 40,
    maxHeight: 40,
    flex: 1,
    width: 70,
    textAlign: 'center'
  },
  errorMessageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  paddingBox: {
    flex: 1
  }
});

const buttonGenerator = (processing, resendCode, codeEntryComplete, confirmationCode) => {
  if (processing) {
    return <Spinner/>
  }
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', height: 120, width: width}}>
      <View style={{flex:1, flexDirection: 'row'}}>

        <Button onPress={() => codeEntryComplete(confirmationCode)} title="Finished" style={{marginTop: 30, marginBottom: 10, width: '90%'}}/>
      </View>
        <BuiltinButton onPress={() => resendCode()} title="Resend Code"/>
    </View>)
};

const confirmationCodeEntry = ({confirmationCode, updateConfirmationCode, codeEntryComplete, processing, wrongConfirmationCode, networkError, unknownError, resendCode}) => (
  <View style={styles.container}>
    <View style={styles.paddingBox}/>
    <View style={styles.textInputContainer}>
      <TextInput value={confirmationCode} placeholder="123456" keyboardType='phone-pad' style={styles.textInputBox}
                 onChangeText={text => updateConfirmationCode(text)} maxLength={6}/>
    </View>
    <View style={styles.buttonContainer}>
      {buttonGenerator(processing, resendCode, codeEntryComplete, confirmationCode)}
    </View>
    <View style={styles.errorMessageContainer}>
      {wrongConfirmationCode
        ? <Text>Wrong confirmation code. Please try again.</Text>
        : null}
      {networkError
        ? <Text>Network Error. Please try again.</Text>
        : null}
      {unknownError
        ? <Text>AAAAA! PANIC!</Text>
        : null}
    </View>
  </View>
);

confirmationCodeEntry.propTypes = {
  confirmationCode: PropTypes.string,
  updateConfirmationCode: PropTypes.func.isRequired,
  codeEntryComplete: PropTypes.func.isRequired,
  processing: PropTypes.bool,
  wrongConfirmationCode: PropTypes.bool,
  networkError: PropTypes.bool,
  unknownError: PropTypes.bool,
  resendCode: PropTypes.func.isRequired
};

export default confirmationCodeEntry