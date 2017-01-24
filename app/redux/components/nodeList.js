/**
 * Created by warren on 1/23/17.
 */
import React, {PropTypes} from 'react';
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

class NodeList extends React.Component {
  static propTypes = {
    nodeListItems: PropTypes.arrayOf(PropTypes.shape({
      nodeName: PropTypes.string,
      nodeId: PropTypes.string.isRequired,
      nodeDescription: PropTypes.string
    })).isRequired,
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
          ? <Text>LOADING...</Text>
          : <ListView dataSource={this.state.dataSource}
                      renderRow={(item) => <NodeListItem nodeId={item.nodeId} key={item.nodeId} selectNode={this.props.selectNode}
                                                         name={item.nodeName} description={item.nodeDescription}/>}
          />}
      </View>
    )
  }
}

export default NodeList