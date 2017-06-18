/**
 * Created by warren on 6/18/17.
 */
import {StyleSheet, TouchableHighlight, Image, I18nManager} from 'react-native'
import React from 'react'
import {ActionConst, Actions} from 'react-native-router-flux'

const styles = StyleSheet.create({
  backButton: {
    height: 37,
    position: 'absolute',
    left: 2,
    padding: 8,
    flexDirection: 'row',
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
  backButtonImage: {
    width: 13,
    height: 21,
  }
});

const backButton = () => (
  <TouchableHighlight style={styles.backButton} onPress={() => Actions.nodes(ActionConst.REFRESH)}>
    <Image style={styles.backButtonImage} source={require('../../node_modules/react-native-router-flux/src/back_chevron.png')}/>
  </TouchableHighlight>
);

export default backButton