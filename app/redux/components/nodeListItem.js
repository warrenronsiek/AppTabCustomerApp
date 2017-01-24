/**
 * Created by warren on 1/23/17.
 */
import React, {PropTypes} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';

const styles = StyleSheet.create({
  venueBlock: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#f1f1f1',
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 1,
    padding: 20,
    maxHeight: 120,
    height: 120,
    alignItems: 'center'
  },
  venueText: {
    alignItems: 'center'
  }
});

const NodeListItem = ({nodeId, nodeName, nodeDescription, selectNode}) => (
  <View style={styles.venueBlock}>
    <Text>{nodeName}</Text>
    <Text>{nodeDescription}</Text>
    <Button onPress={() => selectNode(nodeId)} title="Select"/>
  </View>
);


NodeListItem.propTypes = {
  nodeId: PropTypes.string.isRequired,
  nodeName: PropTypes.string,
  nodeDescription: PropTypes.string,
  selectNode: PropTypes.func.isRequired
};

export default NodeListItem