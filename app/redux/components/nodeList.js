/**
 * Created by warren on 1/23/17.
 */
import React, {PropTypes, Component} from 'react';
import {Text, StyleSheet, View, ListView} from 'react-native';
import NodeListItem from './nodeListItem';

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingBottom: 40,
    flex: 1,
    backgroundColor: '#f5fcff'
  }
});

class NodeList extends Component {
  static propTypes = {
    nodeListItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    renderNodes: PropTypes.bool.isRequired,
    selectNode: PropTypes.func.isRequired
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
                                                         nodeDescription={item.nodeDescription}/>}/>
          : <Text>LOADING...</Text>
        }
      </View>
    )
  }
}

export default NodeList