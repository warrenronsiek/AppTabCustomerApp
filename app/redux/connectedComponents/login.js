/**
 * Created by warren on 1/22/17.
 */
import {connect} from 'react-redux';
import {
  updateEmail,
  updatePassword
} from '../actions/login';
import loginThunk from '../middleware/login';
import login from '../components/login';
import {Actions} from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {
    validationError: state.loginState.validationError,
    networkError: state.loginState.networkError,
    unknownError: state.loginState.unknownError,
    loggingIn: state.loginState.loggingIn,
    email: state.loginParams.email,
    password: state.loginParams.password
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateEmail: (email) => dispatch(updateEmail(email)),
    updatePassword: (password) => dispatch(updatePassword(password)),
    onLogin: (email, password) => dispatch(loginThunk(email, password)),
    navToRegister: () => Actions.register()
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(login)