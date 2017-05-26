/**
 * Created by warren on 3/27/17.
 */

import NetworkError from '../errors/networkError';
import {url} from '../vars'
import logger from '../api/loggingApi'

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
      const bodyParse = JSON.parse(body);
        if (bodyParse.message === 'GetCustomerTokenSuccessful') {
          return bodyParse
        } else {
          throw new Error('Failed to get token', res)
        }
      }
    )
};