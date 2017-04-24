/**
 * Created by warren on 4/2/17.
 */
import React, {PropTypes, Component} from 'react';
import {Text, StyleSheet, View, ListView} from 'react-native';
import PaymentItem from './paymentListItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
});

class PaymentMethodSelection extends Component {
  static propTypes = {
    paymentListItems: PropTypes.arrayOf(PropTypes.shape({
      brand: PropTypes.string.isRequired,
      last4: PropTypes.string.isRequired,
      ccToken: PropTypes.string.isRequired,
      isSelected: PropTypes.bool.isRequired
    })).isRequired,
    selectCard: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    console.log(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.paymentListItems)
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.paymentListItems)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.paymentListItems.length > 0
          ? <ListView dataSource={this.state.dataSource}
                      renderRow={(item) => <PaymentItem brand={item.brand} isSelected={item.isSelected} last4={item.last4} ccToken={item.ccToken} select={this.props.selectCard}/>}/>
          : <Text>LOADING...</Text>
        }
      </View>
    )
  }
}

export default PaymentMethodSelection