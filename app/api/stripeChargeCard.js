/**
 * Created by warren on 5/5/17.
 */
import NetworkError from '../errors/networkError';

export default stripeCreateCustomer = (amount, stripeToken, cardToken, nodeId) => {
  const url = 'https://zapkwgntzh.execute-api.us-west-2.amazonaws.com/dev/stripe-charge-card';

  return fetch(url, {method: 'POST', body: JSON.stringify({amount, customerToken: stripeToken, cardToken, nodeId})})
    .then((res) => {
      if (res.ok) {
        return res._bodyText
      } else {
        throw new NetworkError('failed to fetch stripeChargeCard', 'api/stripeChargeCard', 17)
      }
    })
    .then((body) => {
        return JSON.parse(body);
      }
    )
};