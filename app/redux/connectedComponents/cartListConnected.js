/**
 * Created by warren on 3/1/17.
 */
import {connect} from 'react-redux'
import {incrementCount, decrementCount, updateTip, toggleIncrementer} from '../actions/cartActions'
import CartList from '../components/cartList'
import checkoutThunk from '../middleware/checkoutThunk'
import centsIntToString from '../../common/centsIntToString'
import * as _ from 'lodash'

const mapStateToProps = (state) => {
  return {
    cartListItems: state.cart.items,
    totalCartCost: state.cart.costs.totalViewableCart,
    tax: state.cart.costs.totalViewableTax,
    tip: state.cart.costs.totalViewableTip,
    tipPct: state.cart.costs.tip,
    total: state.cart.costs.totalViewableCost ,
    checkingOut: state.cartStatus.checkingOut
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementCount: (itemId, itemOptions) => dispatch(incrementCount(itemId, itemOptions)),
    decrementCount: (itemId, itemOptions) => dispatch(decrementCount(itemId, itemOptions)),
    toggleIncrementer: (itemId, itemOptions) => dispatch(toggleIncrementer(itemId, itemOptions)),
    checkout: () => dispatch(checkoutThunk()),
    updateTip: tipPercent => dispatch(updateTip(tipPercent))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList)