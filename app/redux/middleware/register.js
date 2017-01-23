/**
 * Created by warren on 1/22/17.
 */
import registerRequest from '../../api/register'
import loginRequest from '../../api/login';
import {registering, networkError, userExistsError, unknownError} from '../actions/register';
import {updateAuth} from '../actions/login';
import {Actions} from 'react-native-router-flux';

export default registerThunk = (name, email, password) => (dispatch) => {
  Promise.resolve(dispatch(registering()))
    .then(res => {
      return registerRequest(email, name, password)
    })
    .then(res => {
      console.log(res);
      return loginRequest(email, password)
    })
    .then(res => {
      console.log(res);
      return Promise.resolve(dispatch(updateAuth(res.accessToken, res.idToken, res.refreshToken, res.userName, res.clientId)))
    })
    .then(() => Actions.placeholder())
    .catch(err => {
      console.log(err);
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