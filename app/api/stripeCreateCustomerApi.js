/**
 * Created by warren on 3/27/17.
 */

import NetworkError from '../errors/networkError';
import {url} from '../vars'

export default stripeCreateCustomer = (customerId, email) => {
  return fetch(url + '/stripe-create-customer', {method: 'POST', body: JSON.stringify({customerId, email})})
    .then((res) => {
      if (res.ok) {
        return res._bodyText
      } else {
        throw new NetworkError('failed to fetch stripeCreateCustomer', res)
      }
    })
    .then(body => {
        const bodyParse = JSON.parse(body);
        if (bodyParse.message === 'StripeClientCreationSuccessful') {
          return bodyParse
        } else {
          throw new Error('stripe failed to create customer.', res)
        }
      }
    )
};