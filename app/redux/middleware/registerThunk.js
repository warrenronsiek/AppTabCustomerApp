/**
 * Created by warren on 1/22/17.
 */
import registerRequest from '../../api/registerApi'
import {registering, clearErrors, networkError, userExistsError, registeringFinished, unknownError} from '../actions/registerActions'
import {Actions} from 'react-native-router-flux'
import logger from '../../api/loggingApi'
import phoneFormatter from 'phone-formatter'

export default registerThunk = (name, email, password, phoneNumber) => (dispatch, getState) => {
  const deviceToken = getState().deviceToken;
  Promise.resolve(dispatch(clearErrors()))
    .then(() => Promise.resolve(dispatch(registering())))
    .then(res => {
      return registerRequest({email, name, password, deviceToken, phoneNumber: '+1' + phoneFormatter.normalize(phoneNumber)})
    })
    .then(res => Actions.code())
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