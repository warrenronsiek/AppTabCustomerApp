/**
 * Created by warren on 1/18/17.
 */
import {
  updateAuth,
  loggingIn,
  unknownError,
  networkError,
  validationError,
  updateStripeToken,
  loginComplete,
  clearErrors
} from '../actions/loginActions'
import loginRequest from '../../api/loginApi'
import fbLogin from '../../api/fbLogin'
import ccActions from '../actions/creditCardActions'
import getCreditCards from '../../api/getCreditCards'
import getStripeToken from '../../api/getStripeToken'
import {Actions} from 'react-native-router-flux'
import logger from '../../api/loggingApi'
import jwt from 'jwt-decode'
import phoneFormatter from 'phone-formatter'
import {updateCredentials, writeToFirehose} from '../../api/aws'
import {get} from 'lodash'
import {userpoolClientId, userpoolUrl} from "../../vars";

const loginThunk = (phoneNumber, password) => (dispatch, getState) => {
  let customerId;
  Promise.resolve(dispatch(clearErrors()))
    .then(res => Promise.resolve(dispatch(loggingIn())))
    .then(res => {
      return loginRequest({phoneNumber: phoneFormatter.normalize(phoneNumber), password})
    })
    .then(res => {
      return Promise.resolve(dispatch(updateAuth(res.accessToken, res.idToken, res.refreshToken, res.userName, res.customerId)))
    })
    .then(() => {
      Actions.checkout()
    })
    .then(() => {
      dispatch(loginComplete())
    })
    .then(() => {
      customerId = getState().auth.customerId;
      return getStripeToken({customerId})
    })
    .then(res => {
      return Promise.resolve(dispatch(updateStripeToken(res.stripeToken)))
    })
    .then(res => getCreditCards({customerId}))
    .then(res => {
      return Promise.all(res.Items.map(item => Promise.resolve(dispatch(ccActions.token.add(item.CardId.S, item.Last4.S, item.Brand.S, item.ExpMonth.N, item.ExpYear.N, get(item, 'Default.BOOL', undefined))))))
    })
    .then(res => Promise.resolve(dispatch(ccActions.apiQueried(true))))
    .then(res => Promise.resolve(updateCredentials()))
    .then(res => writeToFirehose('Login'))
    .catch(err => {
      logger('error logging in', err);
      dispatch(loginComplete());
      switch (err.name) {
        case "ValidationError":
          dispatch(validationError());
          break;
        case "NetworkError":
          dispatch(networkError());
          break;
        default:
          dispatch(unknownError());
          break;
      }
    })
};

const fbLoginThunk = (event) => (dispatch, getState) => {
  let code = event.url.match('apptab:\\/\\/login\\?code=([a-z0-9\\-]+)?')[1];
  let data = {
    grant_type: 'authorization_code',
    code: code,
    client_id: userpoolClientId,
    redirect_uri: 'apptab://login'
  };
  let formBody = Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join("&");
  let fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formBody
  };

  let customerId;
  fetch(userpoolUrl + '/oauth2/token', fetchOptions)
    .then(res => {
      let resBody = JSON.parse(res._bodyText);
      let decoded = jwt(resBody.id_token);
      return Promise.resolve(dispatch(updateAuth(resBody.access_token, resBody.id_token, resBody.refresh_token, decoded.name, decoded.sub)));
    })
    .then(res => {
      const state = getState();
      return fbLogin({customerId: state.auth.customerId, deviceToken: state.deviceToken.token})
    })
    .then(res => Promise.resolve(dispatch(loggingIn())))
    .then(() => {
      Actions.checkout()
    })
    .then(() => {
      dispatch(loginComplete())
    })
    .then(() => {
      customerId = getState().auth.customerId;
      return getStripeToken({customerId})
    })
    .then(res => {
      return Promise.resolve(dispatch(updateStripeToken(res.stripeToken)))
    })
    .then(res => getCreditCards({customerId}))
    .then(res => {
      return Promise.all(res.Items.map(item => Promise.resolve(dispatch(ccActions.token.add(item.CardId.S, item.Last4.S, item.Brand.S, item.ExpMonth.N, item.ExpYear.N, get(item, 'Default.BOOL', undefined))))))
    })
    .then(res => Promise.resolve(dispatch(ccActions.apiQueried(true))))
    .then(res => Promise.resolve(updateCredentials()))
    .then(res => writeToFirehose('FBLogin'))
    .catch(err => {
      logger('error logging in', err);
      dispatch(loginComplete());
      switch (err.name) {
        case "ValidationError":
          dispatch(validationError());
          break;
        case "NetworkError":
          dispatch(networkError());
          break;
        default:
          dispatch(unknownError());
          break;
      }
    })
};

export {loginThunk, fbLoginThunk}