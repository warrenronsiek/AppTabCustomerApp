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
import ccActions from '../actions/creditCardActions'
import getCreditCards from '../../api/getCreditCards'
import getStripeToken from '../../api/getStripeToken'
import {Actions} from 'react-native-router-flux'
import logger from '../../api/loggingApi'
import phoneFormatter from 'phone-formatter'
import {updateCredentials, writeToFirehose} from '../../api/firehose'
import {get} from 'lodash'

export default loginThunk = (phoneNumber, password) => (dispatch, getState) => {
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
      Actions.nodes()
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
}

