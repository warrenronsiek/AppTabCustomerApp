import React from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import PropTypes from 'prop-types'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  switchContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

});

const optionsListItem = ({optionsListItem, onSelection}) => (
  <View style={styles.container}>
    {optionsListItem.options.map(option => (
      <View style={styles.switchContainer}>
        <Text>{option}</Text>
        <TouchableHighlight onPress={() => onSelection(optionsListItem.optionSetName, option.optionName)}>
          {option.isSelected
            ? <MaterialIcons name="radiobox-blank" size={30}/>
            : <MaterialIcons name="radiobox-marked" size={30}/>}
        </TouchableHighlight>
      </View>
    ))}
  </View>
);

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