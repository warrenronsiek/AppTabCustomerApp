import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, FlatList} from 'react-native'
import OptionsListItem from './optionsListItem'
import Button from '../../common/button'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
  }
});

const optionsList = ({optionSets, onSelection, done}) => (
  <View style={styles.container}>
    <FlatList data={optionSets} keyExtractor={(item, index) => item.optionSetName}
              renderItem={({item}) => <OptionsListItem optionsListItem={item} onSelection={onSelection}/>}/>
    <View style={[styles.container, {paddingTop: 30}]}>
      <Button  onPress={() => done()} title="Done"/>
    </View>
  </View>
);

optionsList.propTypes = {
  optionSets: PropTypes.arrayOf(
    PropTypes.shape({
      optionsListItem: PropTypes.shape({
        optionSetName: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            optionName: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            isSelected: PropTypes.bool.isRequired
          })
        )
      })
    })
  ),
  onSelection: PropTypes.func.isRequired,
  done: PropTypes.func.isRequired
};


export default optionsList