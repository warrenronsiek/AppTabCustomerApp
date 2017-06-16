/**
 * Created by warren on 6/16/17.
 */
import React, {PropTypes} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import Spinner from '../../common/spinner'
import Button from '../../common/button'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
  },
  textInputContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textInputBox: {
    height: 40,
    maxHeight: 40,
    flex: 1,
    width: 70,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'grey'
  }
});

const confirmationCodeEntry = ({confirmationCode, updateConfirmationCode, codeEntryComplete, processing}) => (
  <View style={styles.container}>
    <View style={styles.textInputContainer}>
      <TextInput value={confirmationCode} placeholder="123456" keyboardType='phone-pad' style={styles.textInputBox}
                 onChangeText={text => updateConfirmationCode(text)}/>
    </View>
    <View style={styles.buttonContainer}>
      {processing
        ? <Spinner/>
        : <Button onPress={() => codeEntryComplete(confirmationCode)} title="Finished" style={{marginTop: 30}}/>}
    </View>
  </View>
);

confirmationCodeEntry.propTypes = {
  confirmationCode: PropTypes.string,
  updateConfirmationCode: PropTypes.func.isRequired,
  codeEntryComplete: PropTypes.func.isRequired,
  processing: PropTypes.bool
};

export default confirmationCodeEntry