/**
 * Created by warren on 1/22/17.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, TextInput, StyleSheet, Dimensions, ScrollView} from 'react-native'
import Button from '../../common/button'

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
    flexDirection: 'column'
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
                    updatePhoneNumber, phoneNumber, updateName, name, navToPartTwo
                  }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.textContainer}>
      <View style={[styles.textInputContainer, {borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'grey'}]}>
        <TextInput style={styles.textInputBox} onChangeText={text => updateName(text)} autoCapitalize='words'
                   autoCorrect={false} value={name} placeholder="First Name (So servers know what to call you.)"/>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput style={styles.textInputBox} onChangeText={text => updatePhoneNumber(text)} autoCapitalize='words'
                   autoCorrect={false} value={phoneNumber} placeholder="(123) 456-7890" keyboardType='phone-pad'
                   maxLength={14}/>
      </View>
    </View>
    <View style={styles.buttonContainer}>
      <Button onPress={() => navToPartTwo()} title="Next" style={{width: '90%'}}
              disabled={phoneNumber === undefined || name === undefined || phoneNumber.length !== 14}/>
    </View>
  </ScrollView>
);

register.propTypes = {
  updateName: PropTypes.func.isRequired,
  name: PropTypes.string,
  phoneNumber: PropTypes.string,
  updatePhoneNumber: PropTypes.func.isRequired,
  navToPartTwo: PropTypes.func.isRequired
};
export default register