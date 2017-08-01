/**
 * Created by warren on 5/5/17.
 */
import stripeChargeCard from '../../api/stripeChargeCard'
import ccActions from '../actions/creditCardActions'
import {clearCart} from '../actions/cartActions'
import * as _ from 'lodash'
import {Actions, ActionConst} from 'react-native-router-flux'
import logger from '../../api/loggingApi'
import {writeToFirehose} from '../../api/firehose'

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}


const payThunk = () => (dispatch, getState) => {
  const state = getState();
  const
    venueId = _.find(state.nodes, ['nodeId', state.activeNode.nodeId]).venueId,
    currentCart = state.cart.filter(item => item.venueId === venueId);
  const
    itemTotal = round(_.sum(currentCart.map(item => parseFloat(item.price) * item.count)), 2),
    tip = round(itemTotal * state.additionalCosts.tip, 2),
    tax = round(itemTotal * state.additionalCosts.tax, 2),
    amount = parseInt(round((itemTotal + tip + tax) * 100, 2)),
    stripeToken = state.stripeToken,
    cardToken = state.ccTokens.filter(item => item.isSelected)[0].ccToken,
    nodeId = state.activeNode.nodeId,
    customerId = state.auth.customerId;

  return Promise.resolve(dispatch(ccActions.payment.processing()))
    .then(res => stripeChargeCard({amount, stripeToken, cardToken, nodeId, customerId, items: currentCart, tip, tax, itemTotal}))
    .then(res => dispatch(ccActions.payment.success()))
    .then(res => writeToFirehose('PaymentComplete'))
    .then(res => dispatch(clearCart()))
    .then(res => Actions.tabs({type: 'reset'}))
    .then(res => dispatch(ccActions.payment.reset()))
    .catch(err => {
      dispatch(ccActions.payment.failure());
      logger('error charging card', err)
    })
};

export default payThunk