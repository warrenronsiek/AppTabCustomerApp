/**
 * Created by warren on 6/21/17.
 */
import passwordResetActions from '../actions/passwordResetActions'
import {connect} from 'react-redux'
import ResetPassword from '../components/passwordReset'
import submitUserNameThunk from '../middleware/submitUserNameThunk'
import submitCodePasswordThunk from '../middleware/submitCodePasswordThunk'

const mapStateToProps = (state) => ({
  password: state.passwordResetData.password,
  userName: state.passwordResetData.userName,
  code: state.passwordResetData.code,
  error: state.passwordResetStatus.error,
  processing: state.passwordResetStatus.processing,
  stage: state.passwordResetStatus.stage
});

const mapDispatchToProps = (dispatch) => ({
  updatePassword: password => dispatch(passwordResetActions.update.password(password)),
  updateUserName: name => dispatch(passwordResetActions.update.username(name)),
  updateCode: code => dispatch(passwordResetActions.update.code(code)),
  submitPhoneNumber: userName => dispatch(submitUserNameThunk(userName)),
  submitCodePassword: (code, password, userName) => dispatch(submitCodePasswordThunk(code, password, userName))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)