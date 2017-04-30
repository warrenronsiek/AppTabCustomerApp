/**
 * Created by warren on 4/28/17.
 */
import {Actions} from 'react-native-router-flux'
import ccActions from '../actions/creditCardActions'
import stripeCreateCard from '../../api/stripeCreateCard'

//TODO: validate the arguments
const creditCardFormThunk = (cardNumber, expMonth, expYear, ccv) => (dispatch, getState) => {
  const state = getState();
  const customerId = state.auth.clientId, stripeToken = state.stripeToken;
  let cardToken;

  return stripeCreateCard(customerId, stripeToken, cardNumber, expMonth, expYear, ccv)
    .then(res => {
      cardToken = res.cardData.id;
      return Promise.resolve(dispatch(ccActions.token.add(res.cardData.id, res.cardData.last4, res.cardData.brand, res.cardData.exp_month, res.cardData.exp_year)))
    })
    .then(res => {
      return Promise.resolve(dispatch(ccActions.real.wipe()))
    })
    .then(res => {
      return Promise.resolve(dispatch(ccActions.token.setSelected(cardToken)))
    })
    .then(res => Actions.pop())
    .catch(err => console.log(err))
};

export default creditCardFormThunk