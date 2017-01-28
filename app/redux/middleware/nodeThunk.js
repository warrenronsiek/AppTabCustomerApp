/**
 * Created by warren on 1/23/17.
 */
import {Actions} from 'react-native-router-flux';
import {setActiveNode} from '../actions/nodeActions';

const selectNode = (nodeId) => (dispatch) => {
  Promise.resolve(dispatch(setActiveNode(nodeId)))
    .then(() => Actions.request())
    .catch(err => console.log(err))
};

export default selectNode