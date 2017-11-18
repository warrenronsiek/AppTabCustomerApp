/**
 * Created by warren on 4/2/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Text, StyleSheet, View, FlatList, Image} from 'react-native'
import PaymentItem from './paymentListItem'
import Button from '../../common/button'
import Spinner from '../../common/spinner'
import * as _ from 'lodash'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  cardImageContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70,
  },
  listContainer: {
    flex: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    maxHeight: 300,
  },
  buttonContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerContainer: {
    alignItems: 'center',
    paddingTop: 30,
    justifyContent: 'center',
    flex: 1
  },
  headerText: {
    fontSize: 20,
    fontWeight: '200',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center'
  }
});

class PaymentMethodSelection extends Component {
  static propTypes = {
    paymentListItems: PropTypes.arrayOf(PropTypes.shape({
      brand: PropTypes.string.isRequired,
      last4: PropTypes.string.isRequired,
      ccToken: PropTypes.string.isRequired,
      isSelected: PropTypes.bool.isRequired,
      expMonth: PropTypes.string.isRequired,
      expYear: PropTypes.string.isRequired
    })).isRequired,
    selectCard: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired,
    pay: PropTypes.func.isRequired,
    paymentStatus: PropTypes.shape({
      failure: PropTypes.bool,
      success: PropTypes.bool,
      processing: PropTypes.bool
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cardImageContainer}>
          <Text style={styles.headerText}>Please select your credit card.</Text>
        </View>
        <View style={this.props.paymentListItems.length > 0 ? styles.listContainer : [styles.listContainer, {
          alignItems: 'center',
          justifyContent: 'center'
        }]}>
          {this.props.paymentListItems.length > 0
            ? <FlatList data={this.props.paymentListItems} automaticallyAdjustContentInsets={false}
                        keyExtractor={(item, index) => item.ccToken}
                        renderItem={({item}) => <PaymentItem brand={item.brand} isSelected={item.isSelected}
                                                             last4={item.last4} ccToken={item.ccToken}
                                                             expMonth={item.expMonth} expYear={item.expYear}
                                                             select={this.props.selectCard}/>}/>
            : <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text>Please add a credit card. </Text><Text>You can do that by pressing the Add Card button.</Text>
            </View>
          }
        </View>
        <View style={styles.buttonContainer}>
          {!this.props.paymentStatus.processing && !this.props.paymentStatus.success ?
            <Button onPress={() => this.props.pay()} title="Pay"
                    disabled={!_.some(this.props.paymentListItems, 'isSelected')}
                    style={{marginBottom: 10, width: 110}}/> : null
          }
          {!this.props.paymentStatus.processing && !this.props.paymentStatus.success ?
            <Button onPress={() => this.props.addCard()} title="Add Card" style={{width: 110}}/> : null
          }
          {this.props.paymentStatus.failure ? <Text>Something went wrong processing your card.</Text> : null}
          {this.props.paymentStatus.processing ? <View style={styles.spinnerContainer}><Spinner/></View> : null}
        </View>
      </View>
    )
  }
}

export default PaymentMethodSelection