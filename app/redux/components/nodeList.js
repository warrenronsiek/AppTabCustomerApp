/**
 * Created by warren on 1/23/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View, FlatList, Text} from 'react-native'
import NodeListItem from './nodeListItem'
import Spinner from '../../common/spinner'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'grey',
  },
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  scannerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  welcomeHeadline: {
    fontSize: 28,
    fontWeight: "200",
  },
  welcomeFooter: {

  }
});

class NodeList extends Component {
  static propTypes = {
    nodeListItems: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        nodeId: PropTypes.string,
        venueId: PropTypes.string
      })),
      key: PropTypes.string,
    })).isRequired,
    renderNodes: PropTypes.bool.isRequired,
    selectNode: PropTypes.func.isRequired,
    activeNode: PropTypes.string.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeHeadline}>Welcome!</Text>
          <Text>Please continue to your table.</Text>
        </View>
        {this.props.renderNodes
          ? <FlatList data={this.props.nodeListItems} keyExtractor={(item, index) => item.key}
                      renderItem={({item}) => <NodeListItem key={item.key}
                                                            data={item.data}
                                                            selectNode={this.props.selectNode}/>}/>
          : <View style={styles.scannerContainer}>
            <Text>Looking for nearby tables...</Text>
            <View style={styles.spinnerContainer}><Spinner/></View>
          </View>
        }
      </View>
    )
  }
}

export default NodeList