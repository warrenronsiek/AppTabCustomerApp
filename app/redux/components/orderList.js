import React from 'react'
import PropTypes from 'prop-types'
import OrderListItem from './orderListItem'
import {SectionList, Text, StyleSheet, View} from 'react-native'

const styles = StyleSheet.create({
  sectionHeader: {
    minHeight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: 'grey',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  datetimeHeader: {
    flex: 1,
    paddingLeft: 30,
    fontWeight: 'bold',
    fontSize: 14,
  },
  amountHeader: {
    fontWeight: 'bold',
    paddingRight: 40,
    fontSize: 14,
  }
});

const OrderListHeader = ({dateTime, amount}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.datetimeHeader}>{dateTime}</Text>
    <Text style={styles.amountHeader}>{amount}</Text>
  </View>
);

const orderList = ({orders}) => {
  return <SectionList renderItem={({item}) => <OrderListItem quantity={item.count} itemName={item.itemName}/>}
                      renderSectionHeader={({section}) => <OrderListHeader dateTime={section.displayDate}
                                                                           amount={section.displayAmount}/>}
                      sections={orders} keyExtractor={(item, index) => item.itemId}
  />
};

orderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    transactionId: PropTypes.string,
    amount: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object),
  }))
};

export default orderList