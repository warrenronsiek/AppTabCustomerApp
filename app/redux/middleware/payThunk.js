/**
 * Created by warren on 5/5/17.
 */
import openTransaction from '../../api/openTransaction'
import ccActions from '../actions/creditCardActions'
import transactionActions from '../actions/trasactionActions'
import {clearCart} from '../actions/cartActions'
import * as _ from 'lodash'
import {Actions} from 'react-native-router-flux'
import logger from '../../api/loggingApi'
import {writeToFirehose} from '../../api/firehose'
import round from '../../common/round'

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
    .then(res => openTransaction({amount, stripeToken, cardToken, nodeId, customerId, items: currentCart, tip, tax, itemTotal, venueId}))
    .then(res => {
      let transaction = res.transaction;
      return Promise.resolve(dispatch(transactionActions.update(transaction.transactionId, transaction.amount, transaction.items, transaction.createDate)))
    })
    .then(res => Promise.resolve(dispatch(ccActions.payment.success())))
    .then(res => writeToFirehose('PaymentComplete'))
    .then(res => dispatch(clearCart()))
    .then(res => Actions.tabs())
    .then(res => dispatch(ccActions.payment.reset()))
    .catch(err => {
      dispatch(ccActions.payment.failure());
      logger('error charging card', err)
    })
};

export default payThunk