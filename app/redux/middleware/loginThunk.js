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
import getStripeToken from '../../api/getStripeToken'
import {Actions} from 'react-native-router-flux'
import logger from '../../api/loggingApi'

export default loginThunk = (email, password) => (dispatch, getState) => {
  let customerId;
  Promise.resolve(dispatch(clearErrors()))
    .then(res => Promise.resolve(dispatch(loggingIn())))
    .then(res => {
      return loginRequest(email, password)
    })
    .then(res => {
      return Promise.resolve(dispatch(updateAuth(res.accessToken, res.idToken, res.refreshToken, res.userName, res.clientId)))
    })
    .then(() => {
      Actions.nodes()
    })
    .then(() => {
      customerId = getState().auth.clientId;
      return getStripeToken({customerId})
    })
    .then(res => {
      return Promise.resolve(dispatch(updateStripeToken(res.stripeToken)))
    })
    .then(() => {
      dispatch(loginComplete())
    })
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
}

