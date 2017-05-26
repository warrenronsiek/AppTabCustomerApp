/**
 * Created by warren on 3/27/17.
 */

import NetworkError from '../errors/networkError';
import {url} from '../vars'

export default getStripeToken = (customerId) => {

  return fetch(url + '/stripe-get-token', {method: 'POST', body: JSON.stringify({customerId})})
    .then(res => {
      if (res.ok) {
        return res._bodyText
      } else {
        throw new NetworkError('failed to fetch stripeGetToken', res)
      }
    })
    .then(body => {
        if (body.message === 'GetCustomerTokenSuccessful') {
          return JSON.parse(body)
        } else {
          throw new Error('Failed to get token', res)
        }
      }
    )
};