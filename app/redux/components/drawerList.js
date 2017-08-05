import React from 'react'
import PropTypes from 'prop-types'
import {ScrollView, View, Text, TouchableHighlight, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  scrollStyle: {
    flex: 1,
    backgroundColor: 'grey'
  },
  scrollItem: {
    flex: 1,
    maxHeight: 60,
    height: 60,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'white',
    borderTopColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});

const drawerList = ({logoutThunk}) => (
  <ScrollView style={styles.scrollStyle}>
    <TouchableHighlight style={styles.scrollItem} onPress={() => logoutThunk()}>
      <Text>Logout</Text>
    </TouchableHighlight>
  </ScrollView>
);

drawerList.propTypes = {
  logoutThunk: PropTypes.func.isRequired
};

export default drawerList
