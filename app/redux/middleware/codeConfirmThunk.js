/**
 * Created by warren on 6/16/17.
 */

import {Actions} from 'react-native-router-flux'
import login from '../../api/loginApi'
import {updateAuth, updateStripeToken} from '../actions/loginActions'
import logger from '../../api/loggingApi'
import confirmRegistration from '../../api/confirmRegistration'
import stripeCreateCustomerApi from '../../api/stripeCreateCustomerApi'
import {confirmationCodeProcessing, confirmationCodeProcessingFinished, registeringFinished} from '../actions/registerActions'
import phoneFormatter from 'phone-formatter'

const confirmCodeThunk = (confirmationCode) => (dispatch, getState) => {
  const state = getState(),
    phoneNumber = phoneFormatter.normalize(state.registerParams.phoneNumber);
  Promise.resolve(dispatch(confirmationCodeProcessing()))
    .then(res => confirmRegistration({confirmationCode: confirmationCode, phoneNumber: phoneNumber}))
    .then(res => login({phoneNumber: phoneNumber, password: state.registerParams.password}))
    .then(res => {
      return Promise.resolve(dispatch(updateAuth(res.accessToken, res.idToken, res.refreshToken, res.userName, res.customerId)))
    })
    .then(() => {
      const state = getState();
      return stripeCreateCustomerApi({customerId: state.auth.customerId})
    })
    .then(res => Promise.resolve(dispatch(updateStripeToken(res.stripeToken))))
    .then(() => Actions.nodes())
    .then(() => dispatch(confirmationCodeProcessingFinished()))
    .then(() => dispatch(registeringFinished()))
    .catch(err => {
      logger('error in confirmCodeThunk', err)
    })
};

export default confirmCodeThunk