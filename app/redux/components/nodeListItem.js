/**
 * Created by warren on 1/23/17.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Text, StyleSheet, View, TouchableHighlight} from 'react-native'

const styles = StyleSheet.create({
  nodeBlock: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 120,
    height: 120,
    alignItems: 'center',
  },
  nodeText: {
    flex: 4,
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  highlightContainer: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 10,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  highlight: {
    flex: 1,
    backgroundColor: '#bdbdbd',
    maxWidth: 100,
    minWidth: 100,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  text: {
    fontSize: 46,
    color: 'white',
    fontWeight: 'bold'
  }
});

const NodeListItem = ({data, selectNode}) => (
  <View style={styles.nodeBlock}>
    {data.map(node => (
      <View style={styles.highlightContainer} key={node.nodeId}>
        <TouchableHighlight onPress={() => selectNode(node.nodeId)} style={styles.highlight} underlayColor='#FB5D1E'>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{node.beaconId.slice(-2)}</Text>
          </View>
        </TouchableHighlight>
      </View>
    ))}
  </View>
);


NodeListItem.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    venueId: PropTypes.string,
    beaconId: PropTypes.string
  })),
  selectNode: PropTypes.func.isRequired,
};

export default NodeListItem