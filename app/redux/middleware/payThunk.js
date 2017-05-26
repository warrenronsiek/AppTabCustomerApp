/**
 * Created by warren on 5/5/17.
 */
import stripeChargeCard from '../../api/stripeChargeCard'
import ccActions from '../actions/creditCardActions'
import {clearCart} from '../actions/cartActions'
import * as _ from 'lodash'
import {Actions, ActionConst} from 'react-native-router-flux'

const payThunk = () => (dispatch, getState) => {
  const state = getState();
  const
    venueId = _.find(state.nodes, ['nodeId', state.activeNode]).venueId,
    currentCart = state.cart.filter(item => item.venueId === venueId);
  const
    cartTotal = Math.round(_.sum(currentCart.map(item => parseFloat(item.price) * item.count)) * 100),
    tip = Math.round(cartTotal * state.additionalCosts.tip * 100),
    tax = Math.round(cartTotal * state.additionalCosts.tax * 100),
    total = cartTotal + tip + tax,
    stripeToken = state.stripeToken,
    cardToken = state.ccTokens.filter(item => item.isSelected)[0].ccToken,
    nodeId = state.activeNode,
    customerId = state.auth.clientId;

  return Promise.resolve(dispatch(ccActions.payment.processing()))
    .then(res => stripeChargeCard(total, stripeToken, cardToken, nodeId, customerId, currentCart))
    .then(res => dispatch(ccActions.payment.success()))
    .then(res => dispatch(clearCart()))
    .then(res => Actions.tabs(ActionConst.RESET))
    .then(res => dispatch(ccActions.payment.reset()))
    .catch(err => dispatch(ccActions.payment.failure()))
};

export default payThunk