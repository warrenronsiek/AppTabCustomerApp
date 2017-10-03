/**
 * Created by warren on 2/28/17.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey'
  },
  textContainer: {
    flex: 4,
    flexDirection: 'column',
    paddingLeft: 10,
    justifyContent: 'center'
  },
  nameStyle: {
    fontSize: 20,
    fontWeight: "200"
  },
  descriptionContainer: {
    paddingLeft: 10,
  },
  descriptionStyle: {
    fontSize: 10,
    fontStyle: "italic",
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tagContainer: {
    flexDirection: 'row',
    paddingTop: 5
  },
  tagIcon: {
    paddingLeft: 0,
    paddingRight: 3,
  },
  tagBackground: {
    backgroundColor: '#ADD8E6',
    borderRadius: 3,
    paddingLeft: 3,
    paddingRight: 3
  },
  cartIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  cartIconSubContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const cartListItem = ({itemName, itemDescription, itemId, price, count, incrementCount, decrementCount, itemOptions}) => (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.nameStyle}>{itemName}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text>{price}</Text>
      </View>
      <View style={styles.cartIconContainer}>
        <View style={styles.cartIconSubContainer}>
          <EntypoIcon name="chevron-small-up" size={30} onPress={() => {
            incrementCount(itemId, itemOptions)
          }}/>
        </View>
        <View style={styles.cartIconSubContainer}>
          <Text>{count}</Text>
        </View>
        <View style={styles.cartIconSubContainer}>
          <EntypoIcon name="chevron-small-down" size={30} onPress={() => decrementCount(itemId, itemOptions)}/>

        </View>
      </View>
    </View>
  );

cartListItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemDescription: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  itemOptions: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired
};

export default cartListItem