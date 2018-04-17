/**
 * Created by warren on 5/5/17.
 */
import openTransaction from '../../api/openTransaction'
import ccActions from '../actions/creditCardActions'
import transactionActions from '../actions/trasactionActions'
import {clearCart} from '../actions/cartActions'
import {Actions} from 'react-native-router-flux'
import logger from '../../api/loggingApi'
import {writeToFirehose} from '../../api/aws'

const payThunk = () => (dispatch, getState) => {
  const state = getState();
  const
    amount = state.cart.costs.totalCost,
    currentCart = state.cart.items,
    tip = state.cart.costs.totalTip,
    tax = state.cart.costs.totalTax,
    itemTotal = state.cart.costs.totalCart,
    venueId = state.activeNode.venueId,
    stripeToken = state.stripeToken,
    cardToken = state.ccTokens.filter(item => item.isSelected)[0].ccToken,
    nodeId = state.activeNode.beaconId,
    transactionId = state.cart.transactionId,
    customerId = state.auth.customerId,
    name = state.auth.userName;

  return Promise.resolve(dispatch(ccActions.payment.processing()))
    .then(res => openTransaction({amount, stripeToken, cardToken, beaconId: nodeId, customerId, items: currentCart, tip, tax, itemTotal, venueId, transactionId, name}))
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
      let message = JSON.parse(err.message);
      switch (message.error.code) {
        case 'card_declined':
          alert('This card was declined.\n Please use a different card.');
          break;
        case 'withdrawal_count_limit_exceeded':
          alert('Your withdraw limit has been exceeded.\n Please use a different card.');
          break;
        case 'insufficient_funds':
          alert('This card has insufficient funds.\n Please use a different card.');
          break;
        default:
          alert('Something went wrong with your card.\n Try again or use a different card.')
      }
      logger('error charging card', err)
    })
};

export default payThunk