/**
 * Created by warren on 2/26/17.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, StyleSheet} from 'react-native';
import Button from '../../common/button'

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
    flex: 3,
    flexDirection: 'column',
    paddingLeft: 10
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
  cartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  oneClickButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const menuListItem = ({itemName, itemDescription, itemId, viewablePrice, tags, addToCart, defaultCardExists, oneClickBuy}) => (
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={styles.nameStyle}>{itemName}</Text>
      <Text>{itemDescription}</Text>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <View style={styles.tagIcon} key={index}>
            <View style={styles.tagBackground}>
              <Text>{tag}</Text>
            </View>
          </View>)
        )}
      </View>
    </View>
    <View style={styles.priceContainer}>
      <Text>{viewablePrice}</Text>
    </View>
    <View style={styles.oneClickButtonContainer}>
      <Button onPress={() => oneClickBuy(itemId)} style={{width: 53}} underlayColor="grey" disabled={!defaultCardExists}
              iconProps={{iconName: 'plus-one', iconSize: 30, iconLibrary: 'MaterialCommunityIcons'}}
              title="one tap buy" containerStyle={{flexDirection: 'column'}}
              textStyle={{fontSize: 8}}/>
    </View>
    <View style={styles.cartContainer}>
      <Button onPress={() => addToCart(itemId)}
              iconProps={{iconName: 'cart-plus', iconSize: 30, iconLibrary: 'FontAwesome'}}
              style={{width: 53, marginLeft: 7, marginRight: 13}} underlayColor="grey"
              containerStyle={{marginLeft: -2}}/>
    </View>
  </View>
);

menuListItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemDescription: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  viewablePrice: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  addToCart: PropTypes.func.isRequired,
  defaultCardExists: PropTypes.bool.isRequired,
  oneClickBuy: PropTypes.func.isRequired
};

export default menuListItem