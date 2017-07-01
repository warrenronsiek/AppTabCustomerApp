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
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
  }
});

const renderButton = (stage, code, userName, password, submitPhoneNumber, submitCodePassword) => {
  switch (stage) {
    case 'phoneNumber':
      console.log('rendering phone button', userName);
      return (
        <Button onPress={() => submitPhoneNumber(userName)} disabled={!userName ? true : userName.length !== 10}
                title="Done"/>
      );
    case 'codePassword':
      return (
        <Button onPress={() => submitCodePassword(code, password, userName)} title="Done"
                disabled={(!code ? true : (code.length !== 6)) && (!password ? true : (password.length < 3))}/>
      )
  }
};

const textInputBar = ({iconName, textValue, placeHolder, onChangeText, maxLength, keyBoardType}) => (
  <View style={[styles.inputContainer]}>
    <View style={styles.iconSubContainer}>
      {iconName !== 'key' ? <MaterialIcon name={iconName} size={30}/> : <EnytpoIcon name={iconName} size={30}/>}
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
    {stage === 'phoneNumber'
      ? <View style={{alignItems: 'center'}}>
        <Text>Please enter your phone number</Text>
        <Text>so we can send you a confirmation sms</Text>
      </View>
      : <View style={{alignItems: 'center'}}>
        <Text>Please enter the confirmation code we sent</Text>
        <Text>and your new password</Text>
      </View>}

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
        ? renderButton(stage, code, userName, password, submitPhoneNumber, submitCodePassword)
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