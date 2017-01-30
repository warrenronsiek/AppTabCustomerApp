/**
 * Created by warren on 1/23/17.
 */
import React, {PropTypes} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  nodeBlock: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    maxHeight: 120,
    height: 120,
    alignItems: 'center'
  },
  nodeText: {
    flex: 3,
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  buttonContainer: {
    flex: 1
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const NodeListItem = ({nodeId, nodeName, nodeDescription, selectNode}) => (
  <View style={styles.nodeBlock}>
    <View style={styles.iconContainer}>
      <FontAwesomeIcon name="feed" size={30}/>
    </View>
    <View style={styles.nodeText}>
      <Text>ID: {nodeId.slice(-2)}</Text>
      <Text>Name: {nodeName}</Text>
      <Text>Description: {nodeDescription}</Text>
    </View>
    <View style={styles.buttonContainer}>
      <Button onPress={() => selectNode(nodeId)} title="Select"/>
    </View>
  </View>
);


NodeListItem.propTypes = {
  nodeId: PropTypes.string.isRequired,
  nodeName: PropTypes.string,
  nodeDescription: PropTypes.string,
  selectNode: PropTypes.func.isRequired
};

export default NodeListItem