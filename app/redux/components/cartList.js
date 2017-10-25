/**
 * Created by warren on 3/1/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, FlatList, Slider} from 'react-native';
import CartListItem from './cartListItem';
import Button from '../../common/button'
import Spinner from '../../common/spinner'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subTotalContainer: {
    flex: 2,
    marginTop: 10,
    flexDirection: 'column',
    maxHeight: 90
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  checkoutButtonContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -15
  },
  totalsFontBold: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    paddingLeft: 10,
  },
  listContainer: {
    flex: 5
  },
  dataContainer: {
    flex: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'grey',
  },
  dataRowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
    flexDirection: 'row',
  },
  priceText: {
    textAlignVertical: 'center',
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 10
  },
  sliderContainer: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  }
});

export default class CartList extends Component {
  static propTypes = {
    cartListItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    incrementCount: PropTypes.func.isRequired,
    decrementCount: PropTypes.func.isRequired,
    totalCartCost: PropTypes.string.isRequired,
    checkout: PropTypes.func.isRequired,
    tax: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired,
    updateTip: PropTypes.func.isRequired,
    tipPct: PropTypes.number.isRequired,
    checkingOut: PropTypes.bool,
    toggleIncrementer: PropTypes.func.isRequired
  };


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          {this.props.cartListItems.length === 0
            ? null
            : <FlatList data={this.props.cartListItems}
                        keyExtractor={(item, index) => item.itemId + JSON.stringify(item.itemOptions)}
                        renderItem={({item}) => <CartListItem itemName={item.itemName}
                                                              itemId={item.itemId}
                                                              viewablePrice={item.viewablePrice}
                                                              count={item.count}
                                                              incrementCount={this.props.incrementCount}
                                                              decrementCount={this.props.decrementCount}
                                                              showIncrementer={item.showIncrementer}
                                                              toggleIncrementer={this.props.toggleIncrementer}
                                                              itemOptions={item.itemOptions}

                        />}
            />
          }
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.subTotalContainer}>
            <View style={styles.dataRowContainer}>
              <Text style={styles.totalsFontBold}>Subtotal: </Text>
              <Text style={styles.priceText}>{this.props.totalCartCost}</Text>
            </View>
            <View style={styles.dataRowContainer}>
              <Text style={styles.totalsFontBold}>Tax:</Text>
              <Text style={styles.priceText}>{this.props.tax}</Text>
            </View>
            <View style={styles.dataRowContainer}>
              <Text style={styles.totalsFontBold}>Tip:</Text>
              <Text style={styles.priceText}>{this.props.tip}</Text>
            </View>
          </View>
          <View style={styles.sliderContainer}>
            <Slider maximumValue={50} value={20} onSlidingComplete={value => this.props.updateTip(value / 100.)}
                    onValueChange={value => this.props.updateTip(value / 100.)}/>
          </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.dataRowContainer}>
              <Text style={[styles.totalsFontBold, {fontSize: 20}]}>Total:</Text>
              <Text style={[styles.priceText, {fontSize: 20}]}>{this.props.total}</Text>
            </View>
          </View>
          <View style={styles.checkoutButtonContainer}>
            {this.props.checkingOut
              ? <Spinner/>
              : <Button onPress={() => this.props.checkout()} title="Checkout" style={{width: 120, marginTop: 20}}/>}
          </View>
        </View>
      </View>
    )
  }
}