/**
 * Created by warren on 3/27/17.
 */

import NetworkError from '../errors/networkError';

export default stripeCreateCustomer = (customerId, email) => {
  const url = 'https://zapkwgntzh.execute-api.us-west-2.amazonaws.com/dev/stripe-create-customer';

  return fetch(url, {method: 'POST', body: JSON.stringify({customerId, email})})
    .then((res) => {
      if (res.ok) {
        return res._bodyText
      } else {
        throw new NetworkError('failed to fetch stripeCreateCustomer', 'api/stripeCreateCustomerApi', 17)
      }
    })
    .then((body) => {
        return JSON.parse(body);
      }
    )
};