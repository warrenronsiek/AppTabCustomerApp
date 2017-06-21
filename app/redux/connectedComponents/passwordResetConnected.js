/**
 * Created by warren on 6/21/17.
 */
import passwordResetActions from '../actions/passwordResetActions'
import {connect} from 'react-redux'
import ResetPassword from '../components/passwordReset'

const mapStateToProps = (state) => ({
  password: state.passwordResetData.password,
  userName: state.passwordResetData.userName,
  code: state.passwordResetData.code,
  error: state.passwordResetStatus.error,
  processing: state.passwordResetStatus.processing
});

const mapDispatchToProps = (dispatch) => ({
  updatePassword: password => dispatch(passwordResetActions.update.password(password)),
  updateUserName: name => dispatch(passwordResetActions.update.userName(name)),
  updateCode: code => dispatch(passwordResetActions.update.code(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)