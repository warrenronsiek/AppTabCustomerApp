/**
 * Created by warren on 1/23/17.
 */
import {Actions} from 'react-native-router-flux'
import {setActiveNode} from '../actions/nodeActions'
import {menuApiQueryStatus, updateMenuItem} from '../actions/menuActions'
import logger from '../../api/loggingApi'
import getMenu from '../../api/getMenu'
import noble from 'react-native-ble'
import {writeToFirehose} from "../../api/firehose"

const selectNode = (nodeId) => (dispatch, getState) => {
  noble.stopScanning();
  Promise.resolve(dispatch(setActiveNode(nodeId)))
    .then(() => Promise.resolve(Actions.tabs()))
    .then(() => {
      const state = getState(),
        venueId = state.nodes.filter(node => node.nodeId === state.activeNode.nodeId)[0].venueId;
      return getMenu({venueId})
    })
    .then(res => {
      return Promise.all(res.Items.map(item =>
        Promise.resolve(dispatch(updateMenuItem(
          item.ItemName.S,
          item.ItemDescription.S,
          item.Price.N,
          tags = item.Tags.SS,
          item.Category.S,
          item.ItemId.S,
          item.VenueId.S,
          itemOptions = item.ItemOptions ? item.ItemOptions.S : null)))))
    })
    .then(res => {
      const state = getState(),
        venueId = state.nodes.filter(node => node.nodeId === state.activeNode.nodeId)[0].venueId,
        now = Date.now();
      dispatch(menuApiQueryStatus(venueId, now));
    })
    .then(res => writeToFirehose('NodeSelected'))
    .catch(err => {
      logger('error selecting node', err)})
};

export default selectNode