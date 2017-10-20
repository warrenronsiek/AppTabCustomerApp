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
    amount = state.cart.costs.totalCost,
    stripeToken = state.stripeToken,
    cardToken = state.ccTokens.filter(item => item.isSelected)[0].ccToken,
    nodeId = state.activeNode.nodeId,
    customerId = state.auth.customerId;

  return Promise.resolve(dispatch(ccActions.payment.processing()))
    .then(res => openTransaction({amount, stripeToken, cardToken, nodeId, customerId, items: currentCart, tip, tax, itemTotal, venueId}))
    .then(res => {
      let transaction = res.transaction;
      return Promise.all([
        Promise.resolve(dispatch(transactionActions.update(transaction.transactionId, transaction.amount, transaction.items, transaction.createDate))),
        Promise.resolve(dispatch(transactionActions.alert.add()))
      ])
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