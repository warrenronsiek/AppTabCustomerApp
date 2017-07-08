/**
 * Created by warren on 3/1/17.
 */
import React, {PropTypes, Component} from 'react';
import {View, ListView, StyleSheet, Text} from 'react-native';
import CartListItem from './cartListItem';
import Button from '../../common/button'
import Spinner from '../../common/spinner'

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
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
    marginTop: 30,
    flexDirection: 'row',
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
    justifyContent: 'flex-start'
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
    fontWeight: 'bold'
  }
});

export default class MenuList extends Component {
  static propTypes = {
    cartListItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    incrementCount: PropTypes.func.isRequired,
    decrementCount: PropTypes.func.isRequired,
    totalCartCost: PropTypes.number.isRequired,
    checkout: PropTypes.func.isRequired,
    tax: PropTypes.number.isRequired,
    tip: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    updateTip: PropTypes.func.isRequired,
    tipPct: PropTypes.number.isRequired,
    checkingOut: PropTypes.bool
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {dataSource: ds.cloneWithRows(this.props.cartListItems)};
  }

  componentWillReceiveProps(newProps) {
    this.setState({dataSource: this.state.dataSource.cloneWithRows(newProps.cartListItems)});
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          {this.props.cartListItems.length === 0
            ? null
            : <ListView dataSource={this.state.dataSource}
                        renderRow={item => <CartListItem itemName={item.itemName}
                                                         itemDescription={item.itemDescription}
                                                         itemId={item.itemId}
                                                         price={item.price}
                                                         count={item.count}
                                                         incrementCount={this.props.incrementCount}
                                                         decrementCount={this.props.decrementCount}

                        />}
            />
          }
        </View>
        <View style={styles.tipButtonContainer}>
          <Button title="Tip: 0%" onPress={() => this.props.updateTip(0)}
                  style={this.props.tipPct === 0 ? {backgroundColor: 'grey'} : null}/>
          <Button title="Tip: 10%" onPress={() => this.props.updateTip(.10)}
                  style={[{marginLeft: 10}, this.props.tipPct === .1 ? {backgroundColor: 'grey'} : null]}/>
          <Button title="Tip: 20%" onPress={() => this.props.updateTip(.20)}
                  style={[{marginLeft: 10}, this.props.tipPct === .2 ? {backgroundColor: 'grey'} : null]}/>
          <Button title="Tip: 30%" onPress={() => this.props.updateTip(.30)}
                  style={[{marginLeft: 10}, this.props.tipPct === .3 ? {backgroundColor: 'grey'} : null]}/>
        </View>
        <View style={styles.totalContainer}>
          <View/>
          <View style={styles.totalsTextContainer}>
            <Text style={styles.totalsFont}>Subtotal: </Text>
            <Text style={styles.totalsFont}>Tax: </Text>
            <Text style={styles.totalsFont}>Tip: </Text>
            <Text style={styles.totalsFontBold}>Total: </Text>
          </View>
          <View style={styles.totalsNumbersContainer}>
            <Text style={styles.totalsFont}>
              ${this.props.totalCartCost * 100 % 10 === 0 ? this.props.totalCartCost + '0' : this.props.totalCartCost}
            </Text>
            <Text style={styles.totalsFont}>${this.props.tax}</Text>
            <Text style={styles.totalsFont}>${this.props.tip}</Text>
            <Text style={styles.totalsFontBold}>${this.props.total}</Text>
          </View>
        </View>
        <View style={styles.checkoutButtonContainer}>
          {this.props.checkingOut
            ? <Spinner/>
            : <Button onPress={() => this.props.checkout()} title="Checkout" style={{width: 120, marginTop: 20}}/>}
        </View>
      </View>
    )
  }
}