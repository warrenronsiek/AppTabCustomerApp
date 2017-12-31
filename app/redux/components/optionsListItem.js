import React from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import PropTypes from 'prop-types'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 20
  },
  switchContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  nameContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
  },
  priceContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  }
});

const optionsListItem = ({optionName, isSelected, onSelection, price, optionSetId, optionId}) => {
  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <View style={styles.toggleContainer}>
          <TouchableHighlight onPress={() => onSelection(optionSetId, optionId)} underlayColor="transparent" activeOpacity={0}>
            {isSelected
              ? <Ionicons name="ios-checkbox-outline" size={30}/>
              : <Ionicons name="ios-square-outline" size={30}/>}
          </TouchableHighlight>
        </View>
        <Text style={styles.nameContainer}>{optionName}</Text>
        <Text style={styles.priceContainer}>{price}</Text>
      </View>
    </View>
  )
};

optionsListItem.propTypes = {
  optionsListItem: PropTypes.shape({
    optionSetName: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        optionName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        isSelected: PropTypes.bool.isRequired
      })
    )
  }),
  onSelection: PropTypes.func.isRequired
};

export default optionsListItem