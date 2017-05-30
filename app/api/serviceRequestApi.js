/**
 * Created by warren on 1/28/17.
 */
import NetworkError from '../errors/networkError';
import {url} from '../vars'
import logger from './loggingApi'

export default function serviceRequest(nodeId, userName) {
  return fetch(url + '/service-request', {method: 'POST', body: JSON.stringify({nodeId, userName})})
    .then(res => {
      if (res.ok) {
        return res._bodyText
      } else {
        logger('/service-request failed', res, 'serviceRequestApi.js');
        throw new NetworkError('failed to fetch loginUrl', res)
      }
    })
    .then(body => {
        const bodyParse = JSON.parse(body);
        if(bodyParse.message === 'ServiceRequestSuccessful') {
          return bodyParse
        } else {
          logger('/service-request wrong response', bodyParse, 'serviceRequestApi.js');
          throw new Error('Service request unsuccessful.', bodyParse)
        }
      }
    )
};
