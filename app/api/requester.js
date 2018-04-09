/**
 * Created by warren on 5/29/17.
 */
import NetworkError from '../errors/networkError'
import logger from './loggingApi'
import phoneFormatter from 'phone-formatter'
import {url, apiKey} from '../vars'
import decode from 'jwt-decode'
import store from '../redux/store'
import {updateAuth} from '../redux/actions/loginActions'
import {updateCredentials} from "./aws"
import {get} from 'lodash'

const requester = (apiPath, successMessage, errorMessage, responseProcessor, allowTokenRefresh = true, errorProcessor) => (postBody) => {
    const state = store.getState();
    const desiredFetchParams = {
      method: 'POST', headers: {'Authorization': state.auth.idToken, 'x-api-key': apiKey}, body: JSON.stringify(postBody)
    };
    const tokenRefreshFetchParams = {
      method: 'POST',
      headers: {'x-api-key': apiKey},
      body: JSON.stringify({
        refreshToken: state.auth.refreshToken,
        userName: phoneFormatter.normalize(get(state, 'loginParams.phoneNumber', '')),
        password: state.loginParams.password,
        lastRefresh: state.auth.updateTime
      })
    };

    const desiredFetch = () => fetch(url + apiPath, desiredFetchParams)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else if (res.status.toString().startsWith('5')) {
          return res.json()
        } else if (res.status.toString().startsWith('4')) {
          logger(apiPath + ' failed', res);
          throw new NetworkError('failed to fetch url ' + apiPath, res)
        } else {
          throw new Error('Misc Error at' + apiPath, res)
        }
      })
      .then(body => {
        if (body.message === successMessage) {
          return responseProcessor ? responseProcessor(body) : body
        } else if (errorProcessor) {
          return errorProcessor(body)
        } else {
          logger(apiPath + ' wrong response', body);
          throw new Error(errorMessage, body)
        }
      });

    const tokenRefreshFetch = () => fetch(url + '/refresh-cognito-tokens', tokenRefreshFetchParams)
      .then(res => res.json())
      .then(res => {
        const idVals = decode(res['authParameters']['IdToken']);
        return Promise.resolve({
          accessToken: res['authParameters']['AccessToken'],
          idToken: res['authParameters']['IdToken'],
          refreshToken: res['authParameters']['RefreshToken'],
          userName: idVals['name'],
          customerId: idVals['sub']
        });
      })
      .then(res => Promise.resolve(store.dispatch(updateAuth(res.accessToken, res.idToken, res.refreshToken, res.userName, res.customerId))))
      .then(res => updateCredentials())
      .catch(err => logger('failedTokenRefreshFetch', err));

    const timeCondition = (new Date() - state.auth.updateTime) / (60 * 1000) > 20;
    if (timeCondition && allowTokenRefresh) {
      return tokenRefreshFetch().then(() => desiredFetch())
    } else {
      return desiredFetch()
    }
  }
;

export default requester