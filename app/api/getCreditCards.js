/**
 * Created by warren on 4/24/17.
 */
import NetworkError from '../errors/networkError';
import {url} from '../vars'
import logger from './loggingApi'
import requester from './requester'

export default function getCreditCards(customerId) {

  return fetch(url + '/get-credit-cards', {method: 'POST', body: JSON.stringify({customerId})})
    .then(res => {
      if (res.ok) {
        return res._bodyText
      } else {
        logger('/get-credit-cards failed', res, 'getCreditCards.js');
        throw new NetworkError('Failed to get credit cars. ', res)
      }
    })
    .then(body => {
        const resBody = JSON.parse(body);
        if (resBody.message === 'GetCardsSuccessful') {
          return resBody
        } else {
          logger('/get-credit-cards wrong response', resBody, 'getCreditCards.js');
          throw new Error('Error in getting cards.', body)
        }
      }
    )
}

// export default requester('/get-credit-cards', 'GetCardsSuccessful', 'Error in getting cards.')