/**
 * Created by warren on 1/23/17.
 */
import {Actions} from 'react-native-router-flux'
import {setActiveNode} from '../actions/nodeActions'
import {menuApiQueryStatus, updateMenuItem, updateMenuRanges, updateMenuVisibility} from '../actions/menuActions'
import logger from '../../api/loggingApi'
import getMenu from '../../api/getMenu'
import getVenue from '../../api/getVenue'
import noble from 'react-native-ble'
import {writeToFirehose} from "../../api/aws"
import {get} from 'lodash'

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