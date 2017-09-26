import React from 'react'
import PropTypes from 'prop-types'
import {Text, StyleSheet, View} from 'react-native'

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    paddingTop: 3,
    paddingBottom: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemNameContainer: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 40
  },
  quantityContainer: {
    flex: 1,
    alignItems: 'center'
  },
  itemName: {
    fontWeight: '200',
    fontSize: 20,
  },
  quantity: {
    fontWeight: '200',
    fontSize: 20,
  }
});

const orderListItem = ({itemName, quantity}) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemNameContainer}>
      <Text style={styles.itemName}>{itemName}</Text>
    </View>
    <View style={styles.quantityContainer}>
      <Text style={styles.quantity}>{quantity}</Text>
    </View>
  </View>
);

orderListItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired
};

export default orderListItem