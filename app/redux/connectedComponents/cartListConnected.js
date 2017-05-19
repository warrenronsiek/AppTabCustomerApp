/**
 * Created by warren on 3/1/17.
 */
import {connect} from 'react-redux'
import {incrementCount, decrementCount, updateTip} from '../actions/cartActions'
import CartList from '../components/cartList'
import {Actions} from 'react-native-router-flux'
import checkoutThunk from '../middleware/checkoutThunk'
import * as _ from 'lodash'

const mapStateToProps = (state) => {
  const venueId = _.find(state.nodes, ['nodeId', state.activeNode]).venueId,
    currentCart = _.sortBy(state.cart.filter(item => item.venueId === venueId), ['itemName']),
    totalCartCost = Math.round(_.sum(currentCart.map(item => parseFloat(item.price) * item.count)) * 100) / 100,
    tax = Math.round(totalCartCost * state.additionalCosts.tax *100) / 100,
    tip = Math.round(totalCartCost * state.additionalCosts.tip *100) / 100;
  return {
    cartListItems: currentCart,
    totalCartCost: totalCartCost,
    tax: tax,
    tip: tip,
    tipPct: state.additionalCosts.tip,
    total: Math.round((totalCartCost + tax + tip ) * 100) / 100
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementCount: itemId => dispatch(incrementCount(itemId)),
    decrementCount: itemId => dispatch(decrementCount(itemId)),
    checkout: () => dispatch(checkoutThunk()),
    updateTip: tipPercent => dispatch(updateTip(tipPercent))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList)