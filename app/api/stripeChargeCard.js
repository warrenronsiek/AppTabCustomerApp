/**
 * Created by warren on 5/5/17.
 */
import NetworkError from '../errors/networkError'
import {url} from '../vars'
import logger from './loggingApi'

export default stripeChargeCard = (amount, stripeToken, cardToken, nodeId, customerId, items) => {

  return fetch(url + '/stripe-charge-card', {
    method: 'POST',
    body: JSON.stringify({amount, customerToken: stripeToken, cardToken, nodeId, customerId, transactionItems: items})
  })
    .then((res) => {
      if (res.ok) {
        return res._bodyText
      } else {
        logger('/stripe-charge-card failed', res, 'stripeChargeCard.js');
        throw new NetworkError('failed to fetch stripeChargeCard', res)
      }
    })
    .then((body) => JSON.parse(body))
    .then(body => {
      if (body.message === 'CreditCardChargeSuccessful') {
        return body
      } else {
        logger('/stripe-charge-card wrong response', body, 'stripeChargeCard.js');
        throw new Error('ChargingCardFailed', body)
      }
    })
};