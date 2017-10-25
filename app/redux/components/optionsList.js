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
    flex: 1,
    backgroundColor: 'white'
  },
  sectionHeader: {
    minHeight: 30,
    minWidth: width,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: 'grey',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white'
  },
  headerText: {
    paddingLeft: 20,
    fontWeight: '100'
  },
  itemNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey'
  }
});

const OptionSetHeader = ({optionSetName}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.headerText}>{optionSetName}</Text>
  </View>
);

const optionsList = ({optionSets, onSelection, done, itemName, allOptionsSelected}) => (
  <View style={styles.container}>
    <View style={styles.itemNameContainer}>
      <Text style={styles.itemName}>{itemName}</Text>
      <Text style={styles.itemName}>Options</Text>
    </View>
    <View style={styles.listContainer}>
      <SectionList sections={optionSets} keyExtractor={(item, index) => item.optionSetName + item.optionName}
                   renderItem={({item}) => <OptionsListItem optionName={item.optionName} isSelected={item.isSelected}
                                                            price={'+$' + centsIntToString(item.price)}
                                                            onSelection={onSelection} optionSetId={item.optionSetId}
                                                            optionId={item.optionId}/>}
                   renderSectionHeader={({section}) => <OptionSetHeader optionSetName={section.optionSetName}/>}
                   style={{flex: 1}}
      />
    </View>
    <View style={[styles.container, {marginTop: 30}]}>
      <Button onPress={() => done()} title="Done" disabled={!allOptionsSelected}/>
    </View>
  </View>
);

optionsList.propTypes = {
  optionSets: PropTypes.arrayOf(
    PropTypes.shape({
      optionsListItem: PropTypes.shape({
        optionSetName: PropTypes.string.isRequired,
        optionSetId: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(
          PropTypes.shape({
            optionName: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            isSelected: PropTypes.bool.isRequired,
            optionSetId: PropTypes.string.isRequired,
            optionId: PropTypes.string.isRequired
          })
        )
      })
    })
  ),
  onSelection: PropTypes.func.isRequired,
  done: PropTypes.func.isRequired
};


export default optionsList