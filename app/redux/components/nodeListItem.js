/**
 * Created by warren on 1/23/17.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Text, StyleSheet, View, Button} from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
  nodeBlock: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 120,
    paddingRight: 20,
    height: 120,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    borderTopColor: 'grey'
  },
  nodeText: {
    flex: 4,
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  buttonContainer: {
    flex: 2,
    maxWidth: 130
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

const LocationButton = ({onPress}) => (
  <MaterialIcon.Button name='location-on' size={30} onPress={onPress}>
    Select
  </MaterialIcon.Button>
);

const NodeListItem = ({nodeId, nodeName, nodeDescription, selectNode, activeNode}) => (
  <View style={styles.nodeBlock}>
    <View style={styles.iconContainer}>
      <FontAwesomeIcon name="feed" size={30}/>
    </View>
    <View style={styles.nodeText}>
      <Text>Number: {nodeId.slice(-2)}</Text>
      {nodeName ? <Text>Name: {nodeName}</Text> : null}
      {nodeDescription ? <Text>Details: {nodeDescription}</Text> : null}
    </View>
    <View style={styles.buttonContainer}>
      <LocationButton onPress={() => selectNode(nodeId)} />
    </View>
  </View>
);


NodeListItem.propTypes = {
  nodeId: PropTypes.string.isRequired,
  nodeName: PropTypes.string,
  nodeDescription: PropTypes.string,
  selectNode: PropTypes.func.isRequired,
  activeNode: PropTypes.string.isRequired
};

export default NodeListItem