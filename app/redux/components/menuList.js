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
    flex: 1,
    backgroundColor: 'white'
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
    minHeight: 50,
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
    fontSize: 20,
    fontWeight: '200',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center'
  },
});

const SectionHeader = ({headerName}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.headerText}>{headerName.charAt(0).toUpperCase() + headerName.slice(1)}</Text>
  </View>
);

export default class MenuList extends Component {
  static propTypes = {
    menuListItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    addToCart: PropTypes.func.isRequired,
    selectionsCount: PropTypes.number,
    apiQueried: PropTypes.bool.isRequired,
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
                                                           viewablePrice={item.viewablePrice} tags={item.tags}
                                                           addToCart={this.props.addToCart}
                     />}
        />}
      </View>
    )
  }
}