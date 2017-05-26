/**
 * Created by warren on 5/5/17.
 */
import NetworkError from '../errors/networkError'
import {url} from '../vars'

export default stripeCreateCustomer = (amount, stripeToken, cardToken, nodeId, customerId, items) => {

  return fetch(url + '/stripe-charge-card', {
    method: 'POST',
    body: JSON.stringify({amount, customerToken: stripeToken, cardToken, nodeId, customerId, transactionItems: items})
  })
    .then((res) => {
      if (res.ok) {
        return res._bodyText
      } else {
        throw new NetworkError('failed to fetch stripeChargeCard', res)
      }
    })
    .then((body) => JSON.parse(body))
    .then(body => {
      if (body.message === 'CreditCardChargeSuccessful') {
        return body
      } else {
        throw new Error('ChargingCardFailed', body)
      }
    })
};