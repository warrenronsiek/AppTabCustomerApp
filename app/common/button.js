/**
 * Created by warren on 5/14/17.
 */
import React, {PropTypes} from 'react'
import {View, TouchableHighlight, Text, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    width: 90,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontWeight: '100',
    fontSize: 18
  }
});

const button = ({title, onPress, disabled, style}) => (
  <TouchableHighlight
    onPress={!disabled ? () => onPress() : null}
    style={!disabled ? [styles.button, style] : [styles.button, style, {backgroundColor: 'grey'}]}
    underlayColor='white'>
    <Text style={styles.text}>{title}</Text>
  </TouchableHighlight>
);

button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default button