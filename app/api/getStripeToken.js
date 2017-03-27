/**
 * Created by warren on 3/27/17.
 */

import NetworkError from '../errors/networkError';

export default getStripeToken = (customerId) => {
  const url = 'https://zapkwgntzh.execute-api.us-west-2.amazonaws.com/dev/get-stripe-token';

  return fetch(url, {method: 'POST', body: JSON.stringify({customerId})})
    .then((res) => {
      if (res.ok) {
        return res._bodyText
      } else {
        throw new NetworkError('failed to fetch stripeGetToken', 'api/stripeGetToken', 17)
      }
    })
    .then((body) => {
        return JSON.parse(body);
      }
    )
};