/**
 * Created by warren on 2/26/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, SectionList, Dimensions} from 'react-native'
import MenuListItem from './menuListItem'
import Button from '../../common/button'
import Spinner from '../../common/spinner'

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    flex: 1,
    backgroundColor: '#f5fcff'
  },
  newItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinnerContainer: {
    alignItems: 'center',
    paddingTop: 100,
    flex: 1
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
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
    fontWeight: 'bold'
  },
});

const SectionHeader = ({headerName}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.headerText}>{headerName}</Text>
  </View>
);

export default class MenuList extends Component {
  static propTypes = {
    menuListItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    addToCart: PropTypes.func.isRequired,
    selectionsCount: PropTypes.number,
    apiQueried: PropTypes.bool.isRequired,
    oneClickBuy: PropTypes.func.isRequired,
    defaultCardExists: PropTypes.bool.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.props.apiQueried && <Spinner style={{marginTop: 150, alignItems: 'center', justifyContent: 'center'}}/>}
        {(this.props.menuListItems.length === 0) && (this.props.apiQueried)
        && <View style={styles.textContainer}><Text>This kind of item is not on the menu :(</Text></View>}
        {this.props.menuListItems.length > 0 &&
        <SectionList sections={this.props.menuListItems} keyExtractor={(item, index) => item.itemId}
                     renderSectionHeader={({section}) => <SectionHeader headerName={section.category}/>}
                     renderItem={({item}) => <MenuListItem itemName={item.itemName}
                                                           itemDescription={item.itemDescription}
                                                           itemId={item.itemId}
                                                           price={item.price} tags={item.tags}
                                                           addToCart={this.props.addToCart}
                                                           oneClickBuy={this.props.oneClickBuy}
                                                           defaultCardExists={this.props.defaultCardExists}
                     />}
        />}
      </View>
    )
  }
}