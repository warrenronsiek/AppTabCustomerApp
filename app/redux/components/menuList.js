/**
 * Created by warren on 2/26/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, ListView, StyleSheet, Text, LayoutAnimation, FlatList} from 'react-native'
import MenuListItem from './menuListItem'
import Button from '../../common/button'
import Spinner from '../../common/spinner'

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
  buttonContainer: {
    flex: 1,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'flex-end'
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
  }
});

export default class MenuList extends Component {
  static propTypes = {
    menuListItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    addToCart: PropTypes.func.isRequired,
    checkout: PropTypes.func.isRequired,
    selectionsCount: PropTypes.number,
    apiQueried: PropTypes.bool.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.props.apiQueried && <Spinner style={{marginTop: 150, alignItems: 'center', justifyContent: 'center'}}/>}
        {(this.props.menuListItems.length === 0) && (this.props.apiQueried)
        && <View style={styles.textContainer}><Text>This kind of item is not on the menu :(</Text></View>}
        { this.props.menuListItems.length > 0 &&
        <FlatList data={this.props.menuListItems} keyExtractor={(item, index) => item.itemId}
                  renderItem={({item}) => <MenuListItem itemName={item.itemName}
                                                    itemDescription={item.itemDescription}
                                                    itemId={item.itemId}
                                                    price={item.price} tags={item.tags}
                                                    addToCart={this.props.addToCart}
                  />}
        />}
        <View style={styles.buttonContainer}>
          <Button onPress={() => this.props.checkout()}
                  title={
                    this.props.selectionsCount > 0
                      ? "My Selections: " + this.props.selectionsCount.toString()
                      : "My Selections"} style={{width: 150, marginTop: 10}}
                  disabled={this.props.selectionsCount === 0}
          />
        </View>
      </View>
    )
  }
}