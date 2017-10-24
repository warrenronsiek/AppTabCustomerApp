/**
 * Created by warren on 3/1/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, FlatList} from 'react-native';
import CartListItem from './cartListItem';
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
    paddingBottom: 30
  },
  totalContainer: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'column',
    maxHeight: 90
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  tipButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  checkoutButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  totalsTextContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  totalsNumbersContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  totalsFont: {
    fontSize: 16
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
    flex: 3,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'grey'
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
          <View style={styles.totalContainer}>
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
            <View style={styles.dataRowContainer}>
              <Text style={styles.totalsFontBold}>Total:</Text>
              <Text style={styles.priceText}>{this.props.total}</Text>
            </View>
          </View>
          {/*<View style={styles.tipButtonContainer}>*/}
            {/*<Button title="Tip: 0%" onPress={() => this.props.updateTip(0)}*/}
                    {/*style={this.props.tipPct === 0 ? {backgroundColor: 'grey'} : null}/>*/}
            {/*<Button title="Tip: 10%" onPress={() => this.props.updateTip(.10)}*/}
                    {/*style={[{marginLeft: 10}, this.props.tipPct === .1 ? {backgroundColor: 'grey'} : null]}/>*/}
            {/*<Button title="Tip: 20%" onPress={() => this.props.updateTip(.20)}*/}
                    {/*style={[{marginLeft: 10}, this.props.tipPct === .2 ? {backgroundColor: 'grey'} : null]}/>*/}
            {/*<Button title="Tip: 30%" onPress={() => this.props.updateTip(.30)}*/}
                    {/*style={[{marginLeft: 10}, this.props.tipPct === .3 ? {backgroundColor: 'grey'} : null]}/>*/}
          {/*</View>*/}
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