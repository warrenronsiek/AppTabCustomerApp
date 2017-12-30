/**
 * Created by warren on 1/23/17.
 */
import {Actions} from 'react-native-router-flux'
import {setActiveNode} from '../actions/nodeActions'
import logger from '../../api/loggingApi'
import noble from 'react-native-ble'
import {writeToFirehose} from "../../api/aws"

const selectNode = (nodeId) => (dispatch, getState) => {
  noble.stopScanning();
  Promise.resolve()
    .then(() => {
      const state = getState(),
        venueId = state.nodes.nodeList.filter(node => node.nodeId === nodeId)[0].venueId;
      dispatch(setActiveNode(nodeId, venueId))
    })
    .then(() => Promise.resolve(Actions.tabs()))
    .then(() => writeToFirehose('NodeSelected'))
    .catch(err => {
      logger('error selecting node', err)})
};

export default selectNode