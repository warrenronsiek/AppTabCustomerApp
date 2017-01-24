/**
 * Created by warren on 1/18/17.
 */
import {updateAuth, loggingIn, unknownError, networkError, validationError} from '../actions/loginActions';
import loginRequest from '../../api/loginApi';
import {Actions} from 'react-native-router-flux';

export default loginThunk = (email, password) => (dispatch) => {
  Promise.resolve(dispatch(loggingIn()))
    .then(res => {
      return loginRequest(email, password)
    })
    .then(res => {
      return Promise.resolve(dispatch(updateAuth(res.accessToken, res.idToken, res.refreshToken, res.userName, res.clientId)))
    })
    .then(() => Actions.placeholder())
    .catch(err => {
      console.log(err);
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

