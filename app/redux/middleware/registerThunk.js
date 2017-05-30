/**
 * Created by warren on 1/22/17.
 */
import registerRequest from '../../api/registerApi'
import loginRequest from '../../api/loginApi'
import stripeCreateCustomerApi from '../../api/stripeCreateCustomerApi'
import {registering, clearErrors, networkError, userExistsError, registeringFinished, unknownError} from '../actions/registerActions'
import {updateAuth, updateStripeToken} from '../actions/loginActions'
import {Actions} from 'react-native-router-flux'
import logger from '../../api/loggingApi'

export default registerThunk = (name, email, password) => (dispatch, getState) => {
  Promise.resolve(dispatch(clearErrors()))
    .then(() => Promise.resolve(dispatch(registering())))
    .then(res => {
      return registerRequest({email, name, password})
    })
    .then(res => {
      return loginRequest(email, password)
    })
    .then(res => {
      return Promise.resolve(dispatch(updateAuth(res.accessToken, res.idToken, res.refreshToken, res.userName, res.customerId)))
    })
    .then(() => {
      const state = getState();
      return stripeCreateCustomerApi({customerId: state.auth.customerId, email})
    })
    .then(res => {
      return Promise.resolve(dispatch(updateStripeToken(res.body.stripeToken)))
    })
    .then(() => Actions.nodes())
    .then(() => dispatch(registeringFinished()))
    .catch(err => {
      dispatch(registeringFinished());
      logger( 'error registering', err);
      switch (err.name) {
        case 'UserExistsError':
          dispatch(userExistsError());
          break;
        case 'NetworkError':
          dispatch(networkError());
          break;
        default:
          dispatch(unknownError());
      }
    })
};