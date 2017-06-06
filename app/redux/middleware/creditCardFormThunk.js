/**
 * Created by warren on 4/28/17.
 */
import {Actions} from 'react-native-router-flux'
import ccActions from '../actions/creditCardActions'
import stripeCreateCard from '../../api/stripeCreateCard'
import logger from '../../api/loggingApi'

const creditCardFormThunk = (cardNumber, expMonth, expYear, ccv) => (dispatch, getState) => {
  const state = getState();
  const customerId = state.auth.customerId, stripeToken = state.stripeToken;
  let cardToken;

  return Promise.resolve(dispatch(ccActions.real.tokenizing(true)))
    .then(res => stripeCreateCard(customerId, stripeToken, cardNumber, expMonth, expYear, ccv))
    .then(res => {
      cardToken = res.cardData.id;
      return Promise.resolve(dispatch(ccActions.token.add(res.cardData.id, res.cardData.last4, res.cardData.brand, res.cardData.exp_month.toString(), res.cardData.exp_year.toString())))
    })
    .then(res => {
      return Promise.resolve(dispatch(ccActions.real.wipe()))
    })
    .then(res => {
      return Promise.resolve(dispatch(ccActions.token.setSelected(cardToken)))
    })
    .then(res => Actions.pop())
    .then(res => Promise.resolve(dispatch(ccActions.real.tokenizing(false))))
    .catch(err => logger('failed to process credit card', err))
};

export default creditCardFormThunk