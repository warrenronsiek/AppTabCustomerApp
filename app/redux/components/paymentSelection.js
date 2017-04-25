/**
 * Created by warren on 4/2/17.
 */
import React, {PropTypes, Component} from 'react';
import {Text, StyleSheet, View, ListView, Image, TouchableHighlight, Button} from 'react-native';
import PaymentItem from './paymentListItem'
import * as _ from 'lodash'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardImageContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  listContainer: {
    flex: 2,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    maxHeight: 270
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

class PaymentMethodSelection extends Component {
  static propTypes = {
    paymentListItems: PropTypes.arrayOf(PropTypes.shape({
      brand: PropTypes.string.isRequired,
      last4: PropTypes.string.isRequired,
      ccToken: PropTypes.string.isRequired,
      isSelected: PropTypes.bool.isRequired
    })).isRequired,
    selectCard: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired,
    pay: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    console.log(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.paymentListItems)
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.paymentListItems)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cardImageContainer}><Image source={require('../../assets/images/card_front.png')}/></View>
        <View style={styles.listContainer}>
          {this.props.paymentListItems.length > 0
            ? <ListView dataSource={this.state.dataSource} automaticallyAdjustContentInsets={false}
                        renderRow={(item) => <PaymentItem brand={item.brand} isSelected={item.isSelected}
                                                          last4={item.last4} ccToken={item.ccToken}
                                                          select={this.props.selectCard}/>}/>
            : <Text>LOADING...</Text>
          }
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => this.props.addCard()} title="Add Card"/>
          <Button onPress={() => this.props.pay()} title="Pay" disabled={!_.some(this.props.paymentListItems, 'isSelected')}/>
        </View>
      </View>
    )
  }
}

export default PaymentMethodSelection