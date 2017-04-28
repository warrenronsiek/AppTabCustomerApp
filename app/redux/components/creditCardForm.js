/**
 * Created by warren on 4/2/17.
 */
import React, {PropTypes} from 'react'
import {View, Text, TextInput, StyleSheet, Button, Image} from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import OcticonIcon from 'react-native-vector-icons/Octicons'
import validator from 'payment'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
    marginBottom: 230
  },
  cardImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 3,
    maxHeight: 120
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  numberInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderTopColor: 'grey',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  monthYearCCVContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey'
  },
  ccvSubContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expDateSubContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  numberInput: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30
  },
  ccvInput: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30
  },
  expMonthInput: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30
  },
  expYearInput: {
    flex: 2,
    paddingRight: 30
  }
});

const PaymentImage = ({brand}) => {
  switch (brand) {
    case 'Amex':
      return (<Image source={require('../../assets/images/card_amex.png')}/>);
    case 'Discover':
      return (<Image source={require('../../assets/images/card_discover.png')}/>);
    case 'Visa':
      return (<Image source={require('../../assets/images/card_visa.png')}/>);
    case 'Mastercard':
      return (<Image source={require('../../assets/images/card_mastercard.png')}/>);
    case 'ApplePay':
      return (<Image source={require('../../assets/images/card_applepay.png')}/>);
    default:
      return (<OcticonIcon name="credit-card" size={30}/>)
  }
};

const ccForm = ({
                  ccNumber, ccNumberValid, updateCCNumber, expYear, updateExpYear, expMonth,
                  updateMonth, expiryValid, ccv, ccvValid, updateCCV, zip, zipValid, updateZip, brand, submit
                }) => (
  <View style={styles.container}>
    <View style={styles.cardImageContainer}>
      <FontAwesomeIcon name="cc-stripe" size={60}/>
    </View>
    <View style={styles.formContainer}>
      <View style={styles.numberInputContainer}>
        <TextInput style={styles.numberInput} onChangeText={text => updateCCNumber(text)} autoCorrect={false}
                   value={ccNumber} keyboardType='numeric' placeholder="Card Number"/>
        {brand ? <PaymentImage brand={brand}/> : null}
      </View>
      <View style={styles.monthYearCCVContainer}>
        <View style={styles.ccvSubContainer}>
          <Image style={{marginLeft: 20}} source={require('../../assets/images/card_cvc.png')}/>
          <TextInput style={styles.ccvInput} onChangeText={text => updateCCV(text)} placeholder="CCV" value={ccv}/>
        </View>
        <View style={styles.expDateSubContainer}>
          <Image style={{marginLeft: 20}} source={require('../../assets/images/card_expiry.png')}/>
          <TextInput style={styles.expMonthInput} onChangeText={text => updateMonth(text)} placeholder="MM"
                     value={expMonth} keyboardType='numeric'/>
          <TextInput style={styles.expYearInput} onChangeText={text => updateExpYear(text)} placeholder="YYYY"
                     value={expYear} keyboardType='numeric'/>
        </View>
      </View>
    </View>
    <View style={styles.buttonContainer}>
      <Button onPress={() => submit()} title="Done"/>
    </View>
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
