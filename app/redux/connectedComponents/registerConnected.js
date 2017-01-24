/**
 * Created by warren on 1/22/17.
 */
import {connect} from 'react-redux';
import {updateEmail, updatePassword, updateConfirmPassword, updateName} from '../actions/registerActions';
import Register from '../components/register';
import registerThunk from '../middleware/registerThunk';

const mapStateToProps = (state) => {
  return {
    name: state.registerParams.name,
    email: state.registerParams.email,
    password: state.registerParams.password,
    confirmPassword: state.registerParams.confirmPassword,
    registering: state.registerState.registering,
    networkError: state.registerState.networkError,
    userExistsError: state.registerState.userExistsError,
    unknownError: state.registerState.unknownError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateName: name => dispatch(updateName(name)),
    updateEmail: email => dispatch(updateEmail(email)),
    updatePassword: password => dispatch(updatePassword(password)),
    updateConfirmPassword: confirmPassword => dispatch(updateConfirmPassword(confirmPassword)),
    registerUser: (name, email, password) => dispatch(registerThunk(name, email, password))
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(Register)