import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, FlatList, SectionList, Dimensions} from 'react-native'
import OptionsListItem from './optionsListItem'
import Button from '../../common/button'
import centsIntToString from '../../common/centsIntToString'
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  sectionHeader: {
    minHeight: 30,
    minWidth: width,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: 'grey',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  headerText: {
    paddingLeft: 20,
    fontWeight: '100'
  },
});

const OptionSetHeader = ({optionSetName}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.headerText}>{optionSetName}</Text>
  </View>
);

const optionsList = ({optionSets, onSelection, done, price, allOptionsSelected}) => (
  <View style={styles.container}>
    <SectionList sections={optionSets} keyExtractor={(item, index) => item.optionSetName + item.optionName}
                 renderItem={({item}) => <OptionsListItem optionName={item.optionName} isSelected={item.isSelected}
                                                          optionSetName={item.optionSetName} price={'+$' + centsIntToString(item.price)}
                                                          onSelection={onSelection}/>}
                 renderSectionHeader={({section}) => <OptionSetHeader optionSetName={section.optionSetName}/>}
    />
    <View style={[styles.container, {paddingTop: 30}]}>
      <Text>Total: {price}</Text>
    </View>
    <View style={[styles.container, {paddingTop: 30}]}>
      <Button onPress={() => done()} title="Done" disabled={!allOptionsSelected}/>
    </View>
  </View>
);

optionsList.propTypes = {
  optionSets: PropTypes.arrayOf(
    PropTypes.shape({
      optionsListItem: PropTypes.shape({
        optionSetName: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(
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