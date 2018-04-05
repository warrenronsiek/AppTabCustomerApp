import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons'

const styles = StyleSheet.create({
  iconContainer: {
    alignItems:'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
});

const Options = () => (
  <View style={styles.iconContainer}>
  <SimpleIcons name="options" size={30} color='black'/>
</View>);

export default Options