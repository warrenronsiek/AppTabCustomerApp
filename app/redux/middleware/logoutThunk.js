import {logout} from '../actions/drawerActions'
import {writeToFirehose} from "../../api/aws"
import {Actions} from 'react-native-router-flux'
import {setBluetoothReconstruction} from "../actions/venueActions";

const logoutThunk = () => (dispatch, getState) => {
  writeToFirehose('logout')
    .then(() => {
      dispatch(logout());
      dispatch(setBluetoothReconstruction(true));
    })
    .then(() => Actions.venue({type: 'reset'}))
};

export default logoutThunk