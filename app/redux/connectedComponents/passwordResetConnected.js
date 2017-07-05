/**
 * Created by warren on 6/21/17.
 */
import passwordResetActions from '../actions/passwordResetActions'
import {connect} from 'react-redux'
import ResetPassword from '../components/passwordReset'
import submitPhoneNumberThunk from '../middleware/submitPhoneNumberThunk'
import submitCodePasswordThunk from '../middleware/submitCodePasswordThunk'
import sendResetPasswordCode from '../../api/sendResetPasswordCode'
import phoneFormatter from 'phone-formatter'

const mapStateToProps = (state) => ({
  password: state.passwordResetData.password,
  phoneNumber: state.passwordResetData.phoneNumber,
  code: state.passwordResetData.code,
  error: state.passwordResetStatus.error,
  processing: state.passwordResetStatus.processing,
  stage: state.passwordResetStatus.stage,
  confirmPassword: state.passwordResetData.confirmPassword
});

const mapDispatchToProps = (dispatch) => ({
  updatePassword: password => dispatch(passwordResetActions.update.password(password)),
  updatePhoneNumber: name => dispatch(passwordResetActions.update.phoneNumber(name)),
  updateCode: code => dispatch(passwordResetActions.update.code(code)),
  submitPhoneNumber: phoneNumber => dispatch(submitPhoneNumberThunk(phoneNumber)),
  submitCodePassword: (code, password, phoneNumber) => dispatch(submitCodePasswordThunk(code, password, phoneNumber)),
  resendCode: phoneNumber => sendResetPasswordCode({phoneNumber: phoneFormatter.normalize(phoneNumber)}),
  updateConfirmPassword: confirmPassword => dispatch(passwordResetActions.update.confirmPassword(confirmPassword))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)