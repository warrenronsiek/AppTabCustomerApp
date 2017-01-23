/**
 * Created by warren on 1/20/17.
 */
import React, {Component, PropTypes} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  text: {
    fontSize: 12,
    textAlign: 'center'
  }
});

export default class placeholderScene extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>WOOHOO!</Text>
      </View>
    )
  }
}