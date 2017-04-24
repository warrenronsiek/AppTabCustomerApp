/**
 * Created by warren on 4/2/17.
 */
import React, {PropTypes} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import OcticonIcon from 'react-native-vector-icons/Octicons'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  checkMarkContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const PaymentImage = (brand) => {
  switch (brand) {
    case 'amex':
      return (<Image source={require('../../assets/images/card_amex.png')}/>);
    case 'discover':
      return (<Image source={require('../../assets/images/card_discover.png')}/>);
    case 'visa':
      return (<Image source={require('../../assets/images/card_visa.png')}/>);
    case 'mastercard':
      return (<Image source={require('../../assets/images/card_mastercard.png')}/>);
    case 'applepay':
      return (<Image source={require('../../assets/images/card_applepay.png')}/>);
    default:
      return (<OcticonIcon name="credit-card" size={30}/>)
  }
};

const paymentListItem = ({ccToken, brand, last4, isSelected, select}) => (
  <View style={styles.container}>
    <View style={styles.iconContainer}>
      <PaymentImage brand={brand}/>
    </View>
    <View style={styles.textContainer}>
      <Text>{brand} ending with {last4}</Text>
    </View>
    <View style={styles.checkMarkContainer}>
      {isSelected
        ? <Image source={require('../../assets/images/icon_checkmark.png')}/>
        : null}
    </View>
  </View>
);

paymentListItem.propTypes = {
  ccToken: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  last4: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  select: PropTypes.func.isRequired
};

export default paymentListItem