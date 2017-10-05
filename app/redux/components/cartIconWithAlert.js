import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, StyleSheet} from 'react-native'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  numberCircle: {
    height: 5,
    width: 5,
    borderRadius: 2.5,
    backgroundColor: 'red',
    zIndex: 2
  }
});

const CartIconWithAlert = ({count, selected}) => (
  <View style={styles.iconContainer}>
    {(count > 0)
      ? <FontAwesomeIcons name="shopping-cart" size={30} color={selected ? '#6495ED' : 'black'}/>
      : <View style={styles.iconContainer}>
        <FontAwesomeIcons name="shopping-cart" size={30} color={selected ? '#6495ED' : 'black'}/>
        <View style={styles.numberCircle}>
          <Text>count.toString()</Text>
        </View>
      </View>}
  </View>
);

CartIconWithAlert.propTypes = {
  count: PropTypes.number.isRequired,
  Icon: PropTypes.func.isRequired
};

export default CartIconWithAlert