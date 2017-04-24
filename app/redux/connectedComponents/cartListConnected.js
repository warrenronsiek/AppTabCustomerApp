/**
 * Created by warren on 3/1/17.
 */
import {connect} from 'react-redux';
import {incrementCount, decrementCount} from '../actions/cartActions';
import CartList from '../components/cartList';
import {Actions} from 'react-native-router-flux'
import checkoutThunk from '../middleware/checkoutThunk'
const _ = require('lodash');

const mapStateToProps = (state) => {
  const venueId = _.find(state.nodes, ['nodeId', state.activeNode]).venueId,
    currentCart = state.cart.filter(item => item.venueId === venueId);
  return {
    cartListItems: currentCart,
    totalPrice: Math.round(_.sum(currentCart.map(item => parseFloat(item.price) * item.count)) * 100) / 100
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementCount: itemId => dispatch(incrementCount(itemId)),
    decrementCount: itemId => dispatch(decrementCount(itemId)),
    checkout: () => dispatch(checkoutThunk())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList)