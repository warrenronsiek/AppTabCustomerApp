/**
 * Created by warren on 1/23/17.
 */
import React, {PropTypes} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';

const styles = StyleSheet.create({
  nodeBlock: {
    flex: 1,
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    padding: 20,
    maxHeight: 120,
    height: 120,
    alignItems: 'center'
  },
  nodeText: {
    flex: 2,
    alignItems: 'flex-start',
    flexDirection: 'column'
  }

});

const NodeListItem = ({nodeId, nodeName, nodeDescription, selectNode}) => (
  <View style={styles.nodeBlock}>
    <View style={styles.nodeText}>
      <Text>{nodeId.slice(-2)}</Text>
      <Text>{nodeName}</Text>
      <Text>{nodeDescription}</Text>
    </View>
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