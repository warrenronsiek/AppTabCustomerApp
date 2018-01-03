/**
 * Created by warren on 1/22/17.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, TextInput, StyleSheet, Dimensions, ScrollView} from 'react-native'
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
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'grey',
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

const register = ({updateEmail, email, navToRegisterPartThree}) => (
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.textContainer}>

      <View style={styles.textInputContainer}>
        <TextInput style={styles.textInputBox} onChangeText={text => updateEmail(text)} autoCapitalize='none'
                   autoCorrect={false} value={email} placeholder="Email (Optional)"/>
      </View>

    </View>
    <View style={styles.buttonContainer}>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <Button onPress={() => navToRegisterPartThree()} title="Next" style={{width: '90%'}}/>
      </View>

    </View>
  </ScrollView>
);

register.propTypes = {
  updateEmail: PropTypes.func.isRequired,
  email: PropTypes.string,
  navToRegisterPartThree: PropTypes.func.isRequired
};
export default register