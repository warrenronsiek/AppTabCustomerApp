/**
 * Created by warren on 3/1/17.
 */
import {connect} from 'react-redux'
import {incrementCount, decrementCount, updateTip} from '../actions/cartActions'
import CartList from '../components/cartList'
import checkoutThunk from '../middleware/checkoutThunk'
import * as _ from 'lodash'

const mapStateToProps = (state) => {
  const
    node = _.find(state.nodes, ['nodeId', state.activeNode.nodeId]),
    venueId = node ? node.venueId : null,
    currentCart = _.sortBy(state.cart.filter(item => item.venueId === venueId), ['itemName']),
    totalCartCost = Math.round(_.sum(currentCart.map(item => parseFloat(item.price) * item.count)) * 100) / 100,
    tax = Math.round(totalCartCost * state.additionalCosts.tax * 100) / 100,
    tip = Math.round(totalCartCost * state.additionalCosts.tip * 100) / 100;
  return {
    cartListItems: currentCart,
    totalCartCost: totalCartCost,
    tax: tax,
    tip: tip,
    tipPct: state.additionalCosts.tip,
    total: Math.round((totalCartCost + tax + tip ) * 100) / 100,
    checkingOut: state.cartStatus.checkingOut
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementCount: (itemId, itemOptions) => dispatch(incrementCount(itemId, itemOptions)),
    decrementCount: (itemId, itemOptions) => dispatch(decrementCount(itemId, itemOptions)),
    checkout: () => dispatch(checkoutThunk()),
    updateTip: tipPercent => dispatch(updateTip(tipPercent))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList)