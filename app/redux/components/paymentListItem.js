/**
 * Created by warren on 4/2/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Text, StyleSheet, View, Image, TouchableHighlight} from 'react-native';
import OcticonIcon from 'react-native-vector-icons/Octicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import PanHandler from '../../common/panHandler'
import Button from '../../common/button'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 40
  },
  highlightContainer: {
    flex: 1
  },
  iconContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    flex: 5,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  checkMarkContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  touchable: {
    paddingTop: 12,
    paddingBottom: 12,
    flex: 1
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

const paymentListItem = ({ccToken, brand, last4, isSelected, select, expMonth, expYear, showDeleteButton, hideDeleteButton, deleteCard, deleteButton}) => (
  <View style={styles.container}>

  <PanHandler style={styles.touchable} onClick={() => select(ccToken)} onSwipeLeft={() => showDeleteButton(ccToken)}
              onSwipeRight={() => hideDeleteButton(ccToken)}>
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <PaymentImage brand={brand}/>
      </View>
      <View style={styles.textContainer}>
        <Text> Ending with {last4}.    {expMonth}/{expYear}</Text>
      </View>
      <View style={styles.checkMarkContainer}>
        {isSelected
          ? <MaterialIcon name='check' size={30} color='#fb6821'/>
          : null}
      </View>
    </View>
  </PanHandler>
      {deleteButton
        ? <View>
          <Button onPress={() => deleteCard(ccToken)} iconProps={{iconLibrary: 'EvilIcons', iconName: 'trash', iconSize: 30}}/>
        </View>
        : null}
  </View>
);

paymentListItem.propTypes = {
  ccToken: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  last4: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  select: PropTypes.func.isRequired,
  expMonth: PropTypes.string.isRequired,
  expYear: PropTypes.string.isRequired,
  showDeleteButton: PropTypes.func.isRequired,
  hideDeleteButton: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  deleteButton: PropTypes.bool.isRequired
};

export default paymentListItem