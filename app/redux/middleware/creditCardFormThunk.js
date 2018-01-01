/**
 * Created by warren on 4/28/17.
 */
import {Actions} from 'react-native-router-flux'
import ccActions from '../actions/creditCardActions'
import stripeCreateCard from '../../api/stripeCreateCard'
import logger from '../../api/loggingApi'
import {writeToFirehose} from "../../api/aws"

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
    .then(res => Actions.pop())
    .then(() => writeToFirehose('AddedCreditCard'))
    .then(res => Promise.resolve(dispatch(ccActions.real.tokenizing(false))))
    .catch(err => {
      let message = JSON.parse(err.message);
      switch (message.error.code) {
        case 'card_declined':
          dispatch(ccActions.real.wipe());
          dispatch(ccActions.real.tokenizing(false));
          alert('Credit card declined.\n Please try a different card.');
          break;
        case 'incorrect_cvc':
          dispatch(ccActions.real.tokenizing(false));
          alert('Card failed CVC check.\n Please verify your cvc number.');
          break;
        case 'invalid_cvc':
          dispatch(ccActions.real.tokenizing(false));
          alert('Card failed CVC check.\n Please verify your cvc number.');
          break;
        case 'invalid_expiry_year':
          dispatch(ccActions.real.tokenizing(false));
          alert('Wrong expiry year.\n Please verify your expiry year.');
          break;
        case 'incorrect_number':
          dispatch(ccActions.real.tokenizing(false));
          alert('Incorrect card number.\n Please verify your card number.');
          break;
        case 'invalid_number':
          dispatch(ccActions.real.tokenizing(false));
          alert('Incorrect card number.\n Please verify your card number.');
          break;
        case 'insufficient_funds':
          dispatch(ccActions.real.tokenizing(false));
          dispatch(ccActions.real.wipe());
          alert('This card has insufficient funds.\n Please use a different card.');
          break;
        default:
          dispatch(ccActions.real.wipe());
          dispatch(ccActions.real.tokenizing(false));
          alert('Credit card processing error.\n Please try again or use a different card.')
      }
      logger('failed to process credit card', err)
    })
};

export default creditCardFormThunk