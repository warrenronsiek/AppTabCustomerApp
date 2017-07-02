/**
 * Created by warren on 6/27/17.
 */
import passwordResetActions from '../actions/passwordResetActions'
import sendPasswordResetCode from '../../api/sendResetPasswordCode'

const submitUserNameThunk = (userName) => (dispatch) => {
  Promise.resolve(dispatch(passwordResetActions.processing()))
    .then(res => sendPasswordResetCode({userName}))
    .then(res => Promise.resolve(dispatch(passwordResetActions.stage.codePassword())))
    .catch(err => Promise.resolve(dispatch(passwordResetActions.error())))
};

export default submitUserNameThunk