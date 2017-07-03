/**
 * Created by warren on 6/27/17.
 */
import passwordResetActions from '../actions/passwordResetActions'
import resetPassword from '../../api/resetPassword'
import {Actions} from 'react-native-router-flux'

const submitCodePasswordThunk = (confirmationCode, password, phoneNumber) => dispatch => {
  Promise.resolve(dispatch(passwordResetActions.processing()))
    .then(res => resetPassword({confirmationCode, password, phoneNumber}))
    .then(res => dispatch(passwordResetActions.resetState()))
    .then(res => Actions.pop())
};

export default submitCodePasswordThunk