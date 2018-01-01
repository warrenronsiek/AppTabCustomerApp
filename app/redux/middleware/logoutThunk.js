import {logout} from '../actions/drawerActions'
import {writeToFirehose} from "../../api/aws"
import {Actions} from 'react-native-router-flux'

const logoutThunk = () => (dispatch, getState) => {
  writeToFirehose('logout')
    .then(() => Actions.venue({type: 'reset'}))
    .then(() => {dispatch(logout());})
};

export default logoutThunk