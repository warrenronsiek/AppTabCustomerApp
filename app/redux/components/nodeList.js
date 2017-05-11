/**
 * Created by warren on 1/23/17.
 */
import React, {PropTypes, Component} from 'react'
import {Text, StyleSheet, View, ListView} from 'react-native'
import NodeListItem from './nodeListItem'
import Spinner from '../../common/spinner'

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    backgroundColor: '#f5fcff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'grey',
  },
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class NodeList extends Component {
  static propTypes = {
    nodeListItems: PropTypes.arrayOf(PropTypes.shape(
      {
        nodeId: PropTypes.string.isRequired,
        nodeName: PropTypes.string,
        nodeDescription: PropTypes.string,
      })).isRequired,
    renderNodes: PropTypes.bool.isRequired,
    selectNode: PropTypes.func.isRequired,
    activeNode: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.nodeListItems)
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.nodeListItems)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.renderNodes
          ? <ListView dataSource={this.state.dataSource}
                      renderRow={(item) => <NodeListItem nodeId={item.nodeId} key={item.nodeId} nodeName={item.nodeName}
                                                         selectNode={this.props.selectNode}
                                                         activeNode={this.props.activeNode}
                                                         nodeDescription={item.nodeDescription}/>}/>
          : <View style={styles.spinnerContainer}><Spinner/></View>
        }
      </View>
    )
  }
}

export default NodeList