/**
 * Created by warren on 6/27/17.
 */
import passwordResetActions from '../actions/passwordResetActions'
import resetPassword from '../../api/resetPassword'
import {Actions} from 'react-native-router-flux'

const submitCodePasswordThunk = (confirmationCode, password, userName) => (dispatch, getState) => {
  Promise.resolve(dispatch(passwordResetActions.processing()))
    .then(res => resetPassword(confirmationCode, password, userName))
    .then(res => dispatch(passwordResetActions.resetState()))
    .then(res => Actions.pop())
};

export default submitCodePasswordThunk