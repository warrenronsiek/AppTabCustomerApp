import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, StyleSheet} from 'react-native'
import Home from '../../assets/svgs/home'

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
    minHeight: 20,
  },
  numberCircle: {
    minWidth: 16,
    minHeight: 16,
    borderRadius: 8,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 2,
  }
});

const OrderIconWithAlert = ({count}) => (
  <View style={styles.iconContainer}>
    <Home width={35} height={35}/>
    {(count > 0)
      ? <View style={styles.numberCircle}>
        <Text style={{fontSize: 10, color: 'white'}}>{count.toString()}</Text>
      </View>
      : null}
  </View>
);

OrderIconWithAlert.propTypes = {
  count: PropTypes.number.isRequired,
};

export default OrderIconWithAlert