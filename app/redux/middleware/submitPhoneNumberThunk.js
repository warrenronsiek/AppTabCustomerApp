/**
 * Created by warren on 6/27/17.
 */
import passwordResetActions from '../actions/passwordResetActions'
import sendPasswordResetCode from '../../api/sendResetPasswordCode'
import phoneFormatter from 'phone-formatter'
import {writeToFirehose} from "../../api/firehose";

const submitUserNameThunk = (phoneNumber) => (dispatch) => {
  Promise.resolve(dispatch(passwordResetActions.processing()))
    .then(res => {
      return sendPasswordResetCode({phoneNumber: phoneFormatter.normalize(phoneNumber)})})
    .then(res => {
      return Promise.resolve(dispatch(passwordResetActions.stage.codePassword()))})
    .then(() => writeToFirehose('RequestedPasswordReset'))
    .catch(err => {
      Promise.resolve(dispatch(passwordResetActions.error()))
    })
};

export default submitUserNameThunk