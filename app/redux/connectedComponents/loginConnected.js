/**
 * Created by warren on 1/22/17.
 */
import {connect} from 'react-redux';
import {
  updatePhoneNumber,
  updatePassword,
  loginComponentMounted
} from '../actions/loginActions';
import {loginThunk, fbLoginThunk} from '../middleware/loginThunk';
import login from '../components/login';
import {Actions} from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {
    validationError: state.loginState.validationError,
    networkError: state.loginState.networkError,
    unknownError: state.loginState.unknownError,
    loggingIn: state.loginState.loggingIn,
    phoneNumber: state.loginParams.phoneNumber,
    password: state.loginParams.password,
    loginComponentMounted: state.loginState.loginComponentMounted
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePhoneNumber: (phoneNumber) => dispatch(updatePhoneNumber(phoneNumber)),
    updatePassword: (password) => dispatch(updatePassword(password)),
    onLogin: (phoneNumber, password) => dispatch(loginThunk(phoneNumber, password)),
    navToRegister: () => Actions.register(),
    navToPasswordReset: () => Actions.passwordreset(),
    fbLogin: (event) => dispatch(fbLoginThunk(event)),
    setComponentMounted: () => dispatch(loginComponentMounted())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(login)