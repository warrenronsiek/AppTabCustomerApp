/**
 * Created by warren on 6/20/17.
 */
import React, {PropTypes} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import Button from '../../common/button'
import Spinner from '../../common/spinner'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EnytpoIcon from 'react-native-vector-icons/Entypo'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
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
    alignItems: 'center'
  },
  iconSubContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textInput: {
    flex: 1,
    height: 40
  }
});

const passwordReset = ({password, userName, code, updatePassword, updateUserName, updateCode, processing, error, submit}) => (
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <View style={styles.iconContainer}>
        <View style={styles.iconSubContainer}>
          <MaterialIcon name="sms code" size={30}/>
        </View>
        <View style={styles.iconSubContainer}>
          <MaterialIcon name="phone" size={30}/>
        </View>
        <View style={styles.iconSubContainer}>
          <EnytpoIcon name="key" size={30}/>
        </View>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput value={userName} placeholder="123456" onChangeText={text => updateCode(text)} maxLength={6}
                   autoCapitalize='none' autoCorrect='false' style={styles.textInput} keyboardType="number-pad"/>
        <TextInput value={userName} placeholder="(123) 456-7890" onChangeText={text => updateUserName(text)}
                   autoCapitalize='none' autoCorrect='false' style={styles.textInput} keyboardType="number-pad"/>
        <TextInput value={password} placeholder="password" onChangeText={text => updatePassword(text)}
                   autoCapitalize='none' autoCorrect='false' style={styles.textInput}/>
      </View>
    </View>
    <View style={styles.buttonContainer}>
      {!processing
        ? <Button onPress={() => submit(password, userName, code)} title="Done"/>
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
  submit: PropTypes.func.isRequired
};

export default passwordReset