/**
 * Created by warren on 1/23/17.
 */
import {Actions} from 'react-native-router-flux'
import {setActiveBeacon} from '../actions/beaconActions'
import logger from '../../api/loggingApi'
import {writeToFirehose} from "../../api/aws"

const selectNode = (nodeId) => (dispatch, getState) => {
  Promise.resolve()
    .then(() => {
      const state = getState(),
        venueId = state.nodes.beaconList.filter(node => node.beaconId === nodeId)[0].venueId;
      dispatch(setActiveBeacon(nodeId, venueId))
    })
    .then(() => Promise.resolve(Actions.tabs()))
    .then(() => writeToFirehose('NodeSelected'))
    .catch(err => {
      logger('error selecting node', err)})
};

export default selectNode