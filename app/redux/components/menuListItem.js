/**
 * Created by warren on 2/26/17.
 */
import React, {PropTypes} from 'react'
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20
  },
  textContainer: {
    flex: 4,
    flexDirection: 'column',
    paddingLeft: 10
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
  }
});

const menuListItem = ({itemName, itemDescription, itemId, price, tags}) => (
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
      <Text>{price}</Text>
    </View>
  </View>
);

menuListItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemDescription: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default menuListItem