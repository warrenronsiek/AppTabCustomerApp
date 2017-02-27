/**
 * Created by warren on 1/22/17.
 */
import registerRequest from '../../api/registerApi'
import loginRequest from '../../api/loginApi';
import {registering, networkError, userExistsError, unknownError} from '../actions/registerActions';
import {updateAuth} from '../actions/loginActions';
import {Actions} from 'react-native-router-flux';

export default registerThunk = (name, email, password) => (dispatch) => {
  Promise.resolve(dispatch(registering()))
    .then(res => {
      return registerRequest(email, name, password)
    })
    .then(res => {
      return loginRequest(email, password)
    })
    .then(res => {
      return Promise.resolve(dispatch(updateAuth(res.accessToken, res.idToken, res.refreshToken, res.userName, res.clientId)))
    })
    .then(() => Actions.nodes())
    .catch(err => {
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