/**
 * Created by warren on 4/24/17.
 */
import NetworkError from '../errors/networkError';

export default function getCreditCards(customerId) {
  const url = 'https://zapkwgntzh.execute-api.us-west-2.amazonaws.com/dev/get-credit-cards';

  return fetch(url, {method: 'POST', body: JSON.stringify({customerId})})
    .then((res) => {
      if (res.ok) {
        return res._bodyText
      } else {
        throw new NetworkError('failed to fetch Url: ', url)
      }
    })
    .then((body) => {
        const resBody = JSON.parse(body);
        if (resBody.message === 'GetCardsSuccessful') {
          return resBody
        } else {
          throw new Error('Error in getting cards for: ' + customerId)
        }
      }
    )
};