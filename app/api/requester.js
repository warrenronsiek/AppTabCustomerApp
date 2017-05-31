/**
 * Created by warren on 5/29/17.
 */
import NetworkError from '../errors/networkError'
import logger from './loggingApi'
import {url} from '../vars'
import decode from 'jwt-decode'
import store from '../redux/store'
import {updateAuth} from '../redux/actions/loginActions'

const requester = (apiPath, successMessage, errorMessage, requestProcessor) => (postBody) => {
    const state = store.getState();
    const desiredFetchParams = {
      method: 'POST', headers: {'Authorization': state.auth.idToken}, body: JSON.stringify(postBody)
    };
    const tokenRefreshFetchParams = {
      method: 'POST',
      body: JSON.stringify({
        refreshToken: state.auth.refreshToken,
        userName: state.loginParams.email,
        password: state.loginParams.password,
        lastRefresh: state.auth.updateTime
      })
    };

    const desiredFetch = () => fetch(url + apiPath, desiredFetchParams)
      .then(res => {
        if (res.ok) {
          return res._bodyText
        } else {
          logger(apiPath + ' failed', res);
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
      );

    const tokenRefreshFetch = () => fetch(url + '/refresh-cognito-tokens', tokenRefreshFetchParams)
      .then(res => {
        const resBody = JSON.parse(res._bodyText);
        const idVals = decode(resBody['authParameters']['IdToken']);
        return Promise.resolve({
          accessToken: resBody['authParameters']['AccessToken'],
          idToken: resBody['authParameters']['IdToken'],
          refreshToken: resBody['authParameters']['RefreshToken'],
          userName: idVals['name'],
          customerId: idVals['sub']
        });
      })
      .then(res => Promise.resolve(store.dispatch(updateAuth(res.accessToken, res.idToken, res.refreshToken, res.userName, res.customerId))));

    if ((new Date() - state.auth.updateTime) / (60 * 1000) < 50) {
      return desiredFetch()
    } else {
      return tokenRefreshFetch().then(() => desiredFetch())
    }
  }
;

export default requester