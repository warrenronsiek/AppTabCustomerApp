import React from 'react'
import PropTypes from 'prop-types'
import {ScrollView, View, Text, TouchableHighlight, StyleSheet} from 'react-native'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'

const styles = StyleSheet.create({
  scrollStyle: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: 'white'
  },
  scrollItem: {
    flex: 1,
    maxHeight: 60,
    height: 60,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    borderTopColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '100',
    paddingRight: 30
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
});

const drawerList = ({logoutThunk}) => (
  <ScrollView style={styles.scrollStyle}>
    <TouchableHighlight style={styles.scrollItem} onPress={() => logoutThunk()}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>Logout</Text>
        <SimpleIcon size={30} name="logout"/>
      </View>
    </TouchableHighlight>
  </ScrollView>
);

drawerList.propTypes = {
  logoutThunk: PropTypes.func.isRequired
};

export default drawerList
