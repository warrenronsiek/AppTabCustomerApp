import {connect} from 'react-redux';
import {updateEmail} from '../actions/registerActions';
import registerPartTwo from '../components/registerPartTwo';
import {Actions} from 'react-native-router-flux'

const mapStateToProps = state => ({
  email: state.registerParams.email
});

const mapDispatchToProps = dispatch => ({
  updateEmail: email => dispatch(updateEmail(email)),
  navToRegisterPartThree: () => Actions.registerPartThree()
});

export default connect(mapStateToProps, mapDispatchToProps)(registerPartTwo)