/**
 * Created by warren on 7/2/17.
 */
import store from '../redux/store'
import {Actions} from 'react-native-router-flux'
import passwordResetActions from '../redux/actions/passwordResetActions'

const onBack = () => {
  Actions.pop();
  store.dispatch(passwordResetActions.resetState());
};

export default onBack