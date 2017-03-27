/**
 * Created by warren on 1/18/17.
 */
import {updateAuth, loggingIn, unknownError, networkError, validationError, updateStripeToken} from '../actions/loginActions';
import loginRequest from '../../api/loginApi';
import getStripeToken from '../../api/getStripeToken';
import {Actions} from 'react-native-router-flux';

export default loginThunk = (email, password) => (dispatch, getState) => {
  Promise.resolve(dispatch(loggingIn()))
    .then(res => {
      return loginRequest(email, password)
    })
    .then(res => {
      return Promise.resolve(dispatch(updateAuth(res.accessToken, res.idToken, res.refreshToken, res.userName, res.clientId)))
    })
    .then(() => {
      console.log(getState().auth.clientId);
      return getStripeToken(getState().auth.clientId)
    })
    .then(res => {
      console.log(res);
      return Promise.resolve(dispatch(updateStripeToken(res.stripeToken)))
    })
    .then(() => Actions.nodes())
    .catch(err => {
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

