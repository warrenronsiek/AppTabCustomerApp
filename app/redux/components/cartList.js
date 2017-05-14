/**
 * Created by warren on 3/1/17.
 */
import React, {PropTypes, Component} from 'react';
import {View, ListView, StyleSheet, Text} from 'react-native';
import CartListItem from './cartListItem';
import Button from '../../common/button'

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
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default class MenuList extends Component {
  static propTypes = {
    cartListItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    incrementCount: PropTypes.func.isRequired,
    decrementCount: PropTypes.func.isRequired,
    totalPrice: PropTypes.number.isRequired,
    checkout: PropTypes.func.isRequired
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
            ? <Text>Loading...</Text>
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
        <View style={styles.totalContainer}>
          <Text style={styles.textStyle}>Total:
            ${this.props.totalPrice * 100 % 10 === 0 ? this.props.totalPrice + '0' : this.props.totalPrice}</Text>
          <Button onPress={() => this.props.checkout()} title="Checkout" style={{width: 100, marginTop: 20}}/>
        </View>
      </View>
    )
  }
}