/**
 * Created by warren on 3/31/17.
 */
import {url, stripePublicKey} from '../vars'
import logger from './loggingApi'
// invoke with stripeCreateCard(clientId, stripeToken, '4242 4242 4242 4242', '01', '2020', '123')

export default stripeCreateCard = (customerId, stripeToken, cardNumber, expMonth, expYear, cvc) => {
  const stripeUrl = 'https://api.stripe.com/v1/tokens';
  const processorUrl = url + '/stripe-process-card';

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

  const stripeProcessorOptions = (cardToken, customerToken, customerId) => ({
    method: 'POST',
    body: JSON.stringify({cardToken, customerToken, customerId})
  });

  return fetch(stripeUrl, stripeFetchOptions)
    .then(res => {
      if (!res.ok) {
        logger('stripe create card url failed', res, 'stripeCreateCard.js')
      }
      const resBody = JSON.parse(res._bodyText);
      return fetch(processorUrl, stripeProcessorOptions(resBody.id, stripeToken, customerId))
    })
    .then(res => JSON.parse(res._bodyText))
};