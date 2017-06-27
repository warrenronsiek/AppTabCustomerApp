/**
 * Created by warren on 6/20/17.
 */
import React, {PropTypes} from 'react'
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native'
import Button from '../../common/button'
import Spinner from '../../common/spinner'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import EnytpoIcon from 'react-native-vector-icons/Entypo'
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: width * .3,
    marginRight: width * .3
  },
  textInputContainer: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
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
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textInput: {
    flex: 3,
    height: 40
  },
  inputContainer: {
    flexDirection: 'row',
    flex: 3,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
  }
});

const buttonDisabled = (stage, code, userName, password) => {
  console.log(userName, password, code);
  switch (stage) {
    case 'phoneNumber':
      if (!userName) {
        return true
      } else {
        return (userName.length === 10);
      }
    case 'codePassword':
      if (!code && !password){
        return true
      } else {
        return (code.length === 6) && (password.length > 3);
      }
    default:
      return true
  }
};

const textInputBar = ({iconName, textValue, placeHolder, onChangeText, maxLength, keyBoardType}) => (
  <View style={[styles.inputContainer]}>
    <View style={styles.iconSubContainer}>
      <MaterialIcon name={iconName} size={30}/>
    </View>
    <View style={styles.textInputContainer}>
      <TextInput value={textValue} placeholder={placeHolder} onChangeText={text => onChangeText(text)}
                 autoCapitalize='none' autoCorrect={false} style={styles.textInput} keyboardType={keyBoardType}
                 maxLength={maxLength}/>
    </View>
  </View>
);

const passwordReset = ({
                         password, userName, code, updatePassword, updateUserName, updateCode, processing, error,
                         submitPhoneNumber, submitCodePassword, stage
                       }) => (
  <View style={styles.container}>
    <Text>Please enter the confirmation code </Text>
    <Text>that we just sent to your phone</Text>
    <View style={styles.textContainer}>

      {stage === 'phoneNumber'
        ? textInputBar({
          iconName: 'phone',
          textValue: userName,
          placeHolder: "(123) 456-7890",
          onChangeText: updateUserName,
          keyBoardType: 'number-pad',
          maxLength: 10
        })
        : null }
      {stage === 'codePassword'
        ? textInputBar({
          iconName: 'sms',
          textValue: code,
          placeHolder: '123456',
          onChangeText: updateCode,
          keyBoardType: 'number-pad',
          maxLength: 6
        })
        : null}
      {stage === 'codePassword'
        ? textInputBar({
          iconName: 'key',
          textValue: password,
          placeHolder: 'enter new password',
          onChangeText: updatePassword,
          keyBoardType: 'default',
          maxLength: 30
        })
        : null}

    </View>
    <View style={styles.buttonContainer}>
      {!processing
        ? <Button onPress={() => {
          switch (stage) {
            case 'codePassword':
              submitCodePassword(code, password, userName);
              break;
            case 'phoneNumber':
              submitPhoneNumber(userName);
              break;
            default:
              submitPhoneNumber(userName);
              break;
          }
        }} disabled={buttonDisabled(stage, code, userName, password)} title="Done"/>
        : <Spinner/>}
      {error
        ? <Text>An Error! Ohes noes!</Text>
        : null}
    </View>
  </View>
);

passwordReset.propTypes = {
  password: PropTypes.string,
  userName: PropTypes.string,
  code: PropTypes.string,
  updatePassword: PropTypes.func.isRequired,
  updateUserName: PropTypes.func.isRequired,
  updateCode: PropTypes.func.isRequired,
  processing: PropTypes.bool,
  error: PropTypes.bool,
  submitPhoneNumber: PropTypes.func.isRequired,
  submitCodePassword: PropTypes.func.isRequired,
  stage: PropTypes.string
};

export default passwordReset