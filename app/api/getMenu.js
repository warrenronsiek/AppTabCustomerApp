/**
 * Created by warren on 2/27/17.
 */
import NetworkError from '../errors/networkError';
import {url} from '../vars'

export default function getMenu(venueId) {

  return fetch(url + '/get-menu', {method: 'POST', body: JSON.stringify({venueId})})
    .then(res => {
      if (res.ok) {
        return res._bodyText
      } else {
        throw new NetworkError('failed to fetch Url. ', res)
      }
    })
    .then(body => {
        const resBody = JSON.parse(body);
        if (resBody.message === 'GetMenuSuccessful') {
          return resBody
        } else {
          throw new Error('Error in fetching venue.', body)
        }
      }
    )
};