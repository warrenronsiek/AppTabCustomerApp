/**
 * Created by warren on 2/26/17.
 */
import React, {PropTypes, Component} from 'react';
import {View, ListView, Button, StyleSheet, Text} from 'react-native';
import MenuListItem from './menuListItem';

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingBottom: 40,
    flex: 1,
    backgroundColor: '#f5fcff'
  },
  newItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class MenuList extends Component {
  static propTypes = {
    menuListItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    addToCart: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {dataSource: ds.cloneWithRows(this.props.menuListItems)};
  }

  componentWillReceiveProps(newProps) {
    this.setState({dataSource: this.state.dataSource.cloneWithRows(newProps.menuListItems)});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.menuListItems.length === 0
          ? <Text>Loading...</Text>
          : <ListView dataSource={this.state.dataSource}
                      renderRow={item => <MenuListItem itemName={item.itemName} itemDescription={item.itemDescription}
                                                       itemId={item.itemId}
                                                       price={item.price} tags={item.tags}
                                                       />}/>
        }
      </View>
    )
  }
}