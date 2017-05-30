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
        logger('/stripe-get-token failed', res, 'getStripeToken.js');
        throw new NetworkError('failed to fetch stripeGetToken', res)
      }
    })
    .then(body => {
      const bodyParse = JSON.parse(body);
        if (bodyParse.message === 'GetCustomerTokenSuccessful') {
          return bodyParse
        } else {
          logger('/stripe-get-token wrong response', resBody, 'getStripeToken.js');
          throw new Error('Failed to get token', res)
        }
      }
    )
};