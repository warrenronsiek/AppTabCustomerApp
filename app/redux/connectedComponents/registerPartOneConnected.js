/**
 * Created by warren on 1/22/17.
 */
import {connect} from 'react-redux'
import {
  updateName
} from '../actions/registerActions'
import Register from '../components/registerPartOne'
import phoneHandler from '../middleware/phoneFormatter'
import {Actions} from 'react-native-router-flux';

const mapStateToProps = state => ({
  name: state.registerParams.name,
  phoneNumber: state.registerParams.phoneNumber,
});

const mapDispatchToProps = (dispatch) => ({
  updateName: name => dispatch(updateName(name)),
  updatePhoneNumber: phoneNumber => dispatch(phoneHandler(phoneNumber)),
  navToPartTwo: () => Actions.registerPartTwo()
});

export default connect(mapStateToProps, mapDispatchToProps)(Register)