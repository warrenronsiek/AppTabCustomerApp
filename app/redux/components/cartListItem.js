/**
 * Created by warren on 2/28/17.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, TextInput, StyleSheet, TouchableHighlight} from 'react-native';
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
    justifyContent: 'center',
  },
  nameStyle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  descriptionContainer: {
    paddingLeft: 10,
  },
  descriptionStyle: {
    fontSize: 10,
    fontStyle: "italic",
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
    flexDirection: 'column',
  },
  cartIconSubContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemDataRowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  itemDataContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 90
  },
  priceStyle: {
    flex: 1,
    textAlign: 'right',
    textAlignVertical: 'center',
    paddingRight: 10
  }
});

const cartListItem = ({itemName, itemId, viewablePrice, count, incrementCount, decrementCount, itemOptions, showIncrementer, toggleIncrementer}) => (
  <View style={styles.container}>
    <TouchableHighlight style={{flex:3}} onPress={() => toggleIncrementer(itemId, itemOptions)} underlayColor="white" activeOpacity={0}>
      <View style={styles.itemDataContainer}>
        <View style={[styles.itemDataRowContainer]}>
          <View style={styles.textContainer}>
            <Text style={styles.nameStyle}>{itemName}  x{count}</Text>
          </View>
          <Text style={styles.priceStyle}>{viewablePrice}</Text>
        </View>
        {(Array.isArray(itemOptions) ? itemOptions : []).map(option => (
          <View style={[styles.itemDataRowContainer]} key={option.key}>
            <View style={styles.textContainer}>
              <Text>{option.optionSetName + ': ' + option.optionName}</Text>
            </View>
            <Text style={styles.priceStyle}>{option.viewablePrice}</Text>
          </View>))
        }
      </View>
    </TouchableHighlight>
    {showIncrementer ?
      <View style={styles.cartIconContainer}>
        <View style={styles.cartIconSubContainer}>
          <EntypoIcon name="chevron-small-up" size={30} onPress={() => incrementCount(itemId, itemOptions)}/>
        </View>
        <View style={styles.cartIconSubContainer}>
          <Text>{count}</Text>
        </View>
        <View style={styles.cartIconSubContainer}>
          <EntypoIcon name="chevron-small-down" size={30} onPress={() => decrementCount(itemId, itemOptions)}/>
        </View>
      </View>
      : null
    }
  </View>
);

cartListItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  viewablePrice: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  itemOptions: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  showIncrementer: PropTypes.bool
};

export default cartListItem