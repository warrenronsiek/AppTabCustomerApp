/**
 * Created by warren on 3/31/17.
 */
import {stripePublicKey} from '../vars'
import logger from './loggingApi'
import requester from './requester'
// invoke with stripeCreateCard(clientId, stripeToken, '4242 4242 4242 4242', '01', '2020', '123')

export default stripeCreateCard = (customerId, stripeToken, cardNumber, expMonth, expYear, cvc) => {
  const stripeUrl = 'https://api.stripe.com/v1/tokens';

  const cardDetails = {
    "card[number]": cardNumber,
    "card[exp_month]": expMonth,
    "card[exp_year]": expYear,
    "card[cvc]": cvc
  };

  let formBody = [];
  for (let property in cardDetails) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(cardDetails[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }

  const stripeFetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + stripePublicKey
    },
    body: formBody.join("&")
  };

  return fetch(stripeUrl, stripeFetchOptions)
    .then(res => {
      if (!res.ok) {
        logger('stripe create card url failed', res, 'stripeCreateCard.js')
      }
      const resBody = JSON.parse(res._bodyText);
      return requester('/stripe-process-card', 'CardProcessingSuccessful', 'stripe processor failed')({
        cardToken: resBody.id,
        customerToken: stripeToken,
        customerId: customerId
      });
    })
};