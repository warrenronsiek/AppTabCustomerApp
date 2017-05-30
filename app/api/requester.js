/**
 * Created by warren on 5/29/17.
 */
import NetworkError from '../errors/networkError'
import logger from './loggingApi'
import {url} from '../vars'

const requester = (apiPath, successMessage, errorMessage) => (postBody) => {
  return fetch(url + apiPath, {method: 'POST', body: JSON.stringify(postBody)})
    .then(res => {
      if (res.ok) {
        return res._bodyText
      } else {
        logger( apiPath + ' failed', res);
        throw new NetworkError('failed to fetch url ' + apiPath, res)
      }
    })
    .then(body => {
        const resBody = JSON.parse(body);
        if (resBody.message === successMessage) {
          return resBody
        } else {
          logger(apiPath + ' wrong response', resBody);
          throw new Error(errorMessage, body)
        }
      }
    )
};

export default requester