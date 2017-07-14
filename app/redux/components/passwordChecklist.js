/**
 * Created by warren on 7/11/17.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, Image, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  rowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 4,
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
});

const ItemGen = ({reqSatisfied, text}) => (
  <View style={styles.rowContainer}>
    <View style={styles.iconContainer}>
      {reqSatisfied
        ? <Icon name="checkbox-marked-outline" size={20}/>
        : <Icon name="checkbox-blank-outline" size={20}/>}
    </View>
    <View style={styles.textContainer}>
      <Text>{text}</Text>
    </View>
  </View>
);

const PasswordChecklist = ({hasUpper, hasLower, hasDigit, hasSymbol, hasLength, matches}) => (
  <View style={styles.container}>
    <ItemGen reqSatisfied={hasUpper} text="contains uppercase characters"/>
    <ItemGen reqSatisfied={hasLower} text="contains lowercase characters"/>
    <ItemGen reqSatisfied={hasDigit} text="contains digits"/>
    <ItemGen reqSatisfied={hasSymbol} text="contains punctuation"/>
    <ItemGen reqSatisfied={hasLength} text="at least eight characters long"/>
    <ItemGen reqSatisfied={matches} text="matches"/>
  </View>
);

PasswordChecklist.propTypes = {
  hasUpper: PropTypes.bool,
  hasLower: PropTypes.bool,
  hasDigit: PropTypes.bool,
  hasSymbol: PropTypes.bool,
  hasLength: PropTypes.bool,
  matches: PropTypes.bool
};

export default PasswordChecklist