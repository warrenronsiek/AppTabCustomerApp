/**
 * Created by warren on 1/23/17.
 */
import {Actions} from 'react-native-router-flux'
import {setActiveNode} from '../actions/nodeActions'
import logger from '../../api/loggingApi'
import {writeToFirehose} from "../../api/aws"

const selectNode = (nodeId) => (dispatch, getState) => {
  Promise.resolve()
    .then(() => {
      const state = getState(),
        node = state.nodes.nodes.filter(node => node.nodeId === nodeId)[0];
      dispatch(setActiveNode({nodeId: node.nodeId, nodeName: node.nodeName, venueId: node.venueId, beaconId: node.beaconId}))
    })
    .then(() => Promise.resolve(Actions.tabs()))
    .then(() => writeToFirehose('NodeSelected'))
    .catch(err => {
      console.log(err);
      logger('error selecting node', err)})
};

export default selectNode