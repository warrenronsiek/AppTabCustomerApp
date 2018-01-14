/**
 * Created by warren on 1/22/17.
 */
import registerRequest from '../../api/registerApi'
import {
  registering,
  clearErrors,
  networkError,
  userExistsError,
  registeringFinished,
  unknownError
} from '../actions/registerActions'
import {Actions} from 'react-native-router-flux'
import logger from '../../api/loggingApi'
import phoneFormatter from 'phone-formatter'
import {writeToFirehose} from "../../api/aws"
import ccActions from "../actions/creditCardActions";

export default registerThunk = () => (dispatch, getState) => {
  const state = getState();
  const deviceToken = state.deviceToken.token, name = state.registerParams.name, email = state.registerParams.email,
    password = state.registerParams.password, phoneNumber = state.registerParams.phoneNumber;

  Promise.resolve(dispatch(clearErrors()))
    .then(() => Promise.resolve(dispatch(registering())))
    .then(res => {
      return registerRequest({
        email,
        name,
        password,
        deviceToken,
        phoneNumber: '+1' + phoneFormatter.normalize(phoneNumber)
      })
    })
    .then(() => dispatch(clearErrors()))
    .then(res => Actions.code())
    .then(res => Promise.resolve(dispatch(ccActions.apiQueried(true))))
    .then(() => dispatch(registeringFinished()))
    .then(() => writeToFirehose('RegistrationStepOne'))
    .catch(err => {
      dispatch(registeringFinished());
      logger('error registering', err);
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