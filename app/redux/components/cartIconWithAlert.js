import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, StyleSheet} from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
    minHeight: 20,
    backgroundColor: 'green'
  },
  numberCircle: {
    minWidth: 15,
    minHeight: 15,
    borderRadius: 7.5,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const CartIconWithAlert = ({count}) => (
  <View style={styles.iconContainer}>
    <Ionicon name="ios-notifications" size={36}/>
    {(count > 0)
      ? <View style={styles.numberCircle}>
        <Text style={{fontSize: 10, color: 'white'}}>{count.toString()}</Text>
    </View>
      : null}
  </View>
);

CartIconWithAlert.propTypes = {
  count: PropTypes.number.isRequired,
};

export default CartIconWithAlert