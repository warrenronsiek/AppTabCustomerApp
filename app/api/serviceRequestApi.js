/**
 * Created by warren on 1/28/17.
 */
import NetworkError from '../errors/networkError';
import {url} from '../vars'

export default function serviceRequest(nodeId, userName) {
  return fetch(url + '/service-request', {method: 'POST', body: JSON.stringify({nodeId, userName})})
    .then(res => {
      if (res.ok) {
        return res._bodyText
      } else {
        throw new NetworkError('failed to fetch loginUrl', res)
      }
    })
    .then(body => {
        const bodyParse = JSON.parse(body);
        if(bodyParse.message === 'ServiceRequestSuccessful') {
          return bodyParse
        } else {
          throw new Error('Service request unsuccessful.', bodyParse)
        }
      }
    )
};
