/**
 * Created by warren on 1/23/17.
 */
import {Actions} from 'react-native-router-flux';
import {setActiveNode} from '../actions/nodeActions';
import logger from '../../api/loggingApi'

const selectNode = (nodeId) => (dispatch, getState) => {
  Promise.resolve(dispatch(setActiveNode(nodeId)))
    .then(() => Actions.tabs())
    .catch(err => logger('error selecting node', err))
};

export default selectNode