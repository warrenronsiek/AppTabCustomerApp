/**
 * Created by warren on 1/22/17.
 */
import {connect} from 'react-redux'
import {updatePhoneNumber, updateEmail, updatePassword, updateConfirmPassword, updateName} from '../actions/registerActions'
import Register from '../components/register'
import registerThunk from '../middleware/registerThunk'
import phoneHandler from '../middleware/phoneFormatter'

const mapStateToProps = state => {
  return {
    name: state.registerParams.name,
    email: state.registerParams.email,
    password: state.registerParams.password,
    phoneNumber: state.registerParams.phoneNumber,
    confirmPassword: state.registerParams.confirmPassword,
    registering: state.registerState.registering,
    networkError: state.registerState.networkError,
    userExistsError: state.registerState.userExistsError,
    unknownError: state.registerState.unknownError,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateName: name => dispatch(updateName(name)),
    updateEmail: email => dispatch(updateEmail(email)),
    updatePassword: password => dispatch(updatePassword(password)),
    updateConfirmPassword: confirmPassword => dispatch(updateConfirmPassword(confirmPassword)),
    registerUser: (name, email, password, phoneNumber) => dispatch(registerThunk(name, email, password, phoneNumber)),
    updatePhoneNumber: phoneNumber => dispatch(phoneHandler(phoneNumber))
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(Register)