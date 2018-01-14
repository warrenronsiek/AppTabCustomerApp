/**
 * Created by warren on 1/22/17.
 */
import {connect} from 'react-redux'
import {
  updatePassword,
  updateConfirmPassword,
} from '../actions/registerActions'
import Register from '../components/registerPartThree'
import registerThunk from '../middleware/registerThunk'
import phoneHandler from '../middleware/phoneFormatter'

const mapStateToProps = state => ({
  password: state.registerParams.password,
  confirmPassword: state.registerParams.confirmPassword,
  registering: state.registerState.registering,
  networkError: state.registerState.networkError,
  userExistsError: state.registerState.userExistsError,
  unknownError: state.registerState.unknownError,
  passwordValid: state.registerParams.passwordValid,
});

const mapDispatchToProps = (dispatch) => ({
  updatePassword: password => dispatch(updatePassword(password)),
  updateConfirmPassword: confirmPassword => dispatch(updateConfirmPassword(confirmPassword)),
  registerUser: () => dispatch(registerThunk()),
  updatePhoneNumber: phoneNumber => dispatch(phoneHandler(phoneNumber))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register)