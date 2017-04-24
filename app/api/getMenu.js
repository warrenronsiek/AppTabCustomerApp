/**
 * Created by warren on 2/27/17.
 */
import NetworkError from '../errors/networkError';

export default function getMenu(venueId) {
  const url = 'https://zapkwgntzh.execute-api.us-west-2.amazonaws.com/dev/get-menu';

  return fetch(url, {method: 'POST', body: JSON.stringify({venueId})})
    .then((res) => {
      if (res.ok) {
        return res._bodyText
      } else {
        throw new NetworkError('failed to fetch Url: ', url)
      }
    })
    .then((body) => {
        const resBody = JSON.parse(body);
        if (resBody.message === 'GetMenuSuccessful') {
          return resBody
        } else {
          throw new Error('Error in fetching venue: ' + venueId)
        }
      }
    )
};