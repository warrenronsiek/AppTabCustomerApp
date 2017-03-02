/**
 * Created by warren on 3/1/17.
 */
import {connect} from 'react-redux';
import {incrementCount, decrementCount} from '../actions/cartActions';
import CartList from '../components/cartList';
import {Actions} from 'react-native-router-flux'
const _ = require('lodash');

const mapStateToProps = (state) => {
  const venueId = _.find(state.nodes, ['nodeId', state.activeNode]).venueId,
    currentCart = state.cart.filter(item => item.venueId === venueId);
  return {
    cartListItems: currentCart,
    totalPrice: _.sum(currentCart.map(item => parseFloat(item.price) * item.count))
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementCount: itemId => dispatch(incrementCount(itemId)),
    decrementCount: itemId => dispatch(decrementCount(itemId)),
    checkout: () => Actions.cart()
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList)