/**
 * Created by warren on 6/27/17.
 */
import passwordResetActions from '../actions/passwordResetActions'
import resetPassword from '../../api/resetPassword'
import {Actions} from 'react-native-router-flux'
import logger from '../../api/loggingApi'
import phoneFormatter from 'phone-formatter'
import {writeToFirehose} from "../../api/aws";

const submitCodePasswordThunk = (confirmationCode, password, phoneNumber) => dispatch => {
  Promise.resolve(dispatch(passwordResetActions.processing()))
    .then(res => resetPassword({confirmationCode, password, phoneNumber: phoneFormatter.normalize(phoneNumber)}))
    .then(res => dispatch(passwordResetActions.resetState()))
    .then(res => Actions.pop())
    .then(() => writeToFirehose('PasswordRest'))
    .catch(err => {
      switch (err.name) {
        case 'WrongConfirmationCode':
          dispatch(passwordResetActions.error.wrongCode());
          break;
        default:
          logger('error processing password reset code', err);
          dispatch(passwordResetActions.error.unknown());
          break;
      }
    })
};

export default submitCodePasswordThunk