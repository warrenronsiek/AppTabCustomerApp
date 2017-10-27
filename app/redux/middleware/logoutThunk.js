import {logout} from '../actions/drawerActions'
import {writeToFirehose} from "../../api/firehose"
import {Actions} from 'react-native-router-flux'

const logoutThunk = () => (dispatch, getState) => {
  writeToFirehose('logout')
    .then(() => Actions.login({type: 'reset'}))
    .then(() => {dispatch(logout());})
};

export default logoutThunk