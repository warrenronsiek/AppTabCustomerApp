/**
 * Created by warren on 2/27/17.
 */
import NetworkError from '../errors/networkError';
import {url} from '../vars'
import logger from './loggingApi'
import requester from './requester'

export default function getMenu(venueId) {

  return fetch(url + '/get-menu', {method: 'POST', body: JSON.stringify({venueId})})
    .then(res => {
      if (res.ok) {
        return res._bodyText
      } else {
        logger('/get-menu failed', res, 'getMenu.js');
        throw new NetworkError('failed to fetch Url. ', res)
      }
    })
    .then(body => {
        const resBody = JSON.parse(body);
        if (resBody.message === 'GetMenuSuccessful') {
          return resBody
        } else {
          logger('/get-menu wrong response', resBody, 'getMenu.js');
          throw new Error('Error in fetching venue.', body)
        }
      }
    )
};

// export default requester('/get-menu', 'GetMenuSuccessful', 'Error in fetching venue.')