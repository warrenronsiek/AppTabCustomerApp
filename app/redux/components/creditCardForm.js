/**
 * Created by warren on 4/2/17.
 */
import React, {PropTypes} from 'react'
import {View, Text, TextInput, StyleSheet, Button, Image} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    flexDirection: 'column'
  },
});

const ccForm = ({
                  ccNumber, ccNumberValid, updateCCNumber, expYear, updateExpYear, expMonth,
                  updateMonth, expiryValid, ccv, ccvValid, updateCCV, zip, zipValid, updateZip, brand, submit
                }) => (
  <View style={styles.container}>
    <View style={styles.cardImageContainer}><Image source={require('../../assets/images/card_front.png')}/></View>
  </View>
);

ccForm.propTypes = {
  ccNumber: PropTypes.string,
  ccNumberValid: PropTypes.bool,
  updateCCNumber: PropTypes.func.isRequired,
  expYear: PropTypes.number,
  updateExpYear: PropTypes.func.isRequired,
  expMonth: PropTypes.number,
  updateExpMonth: PropTypes.func.isRequired,
  expiryValid: PropTypes.bool,
  ccv: PropTypes.number,
  ccvValid: PropTypes.bool,
  updateCCV: PropTypes.func.isRequired,
  zip: PropTypes.number,
  zipValid: PropTypes.bool,
  updateZip: PropTypes.func.isRequired,
  brand: PropTypes.string,
  submit: PropTypes.func.isRequired
};

export default ccForm
