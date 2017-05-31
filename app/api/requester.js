/**
 * Created by warren on 5/29/17.
 */
import NetworkError from '../errors/networkError'
import logger from './loggingApi'
import {url} from '../vars'
import store from '../redux/store'

const requester = (apiPath, successMessage, errorMessage, requestProcessor) => (postBody) => {
  const state = store.getState();
  return fetch(url + apiPath, {method: 'POST', headers: {'Authorization': state.auth.idToken}, body: JSON.stringify(postBody)})
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
          return requestProcessor ? requestProcessor(resBody) : resBody
        } else {
          logger(apiPath + ' wrong response', resBody);
          throw new Error(errorMessage, body)
        }
      }
    )
};

export default requester