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
import {writeToFirehose} from "../../api/firehose"

const selectNode = (nodeId) => (dispatch, getState) => {
  noble.stopScanning();
  Promise.resolve()
    .then(() => {
      const state = getState(),
        venueId = state.nodes.nodeList.filter(node => node.nodeId === nodeId)[0].venueId;
      dispatch(setActiveNode(nodeId, venueId))
    })
    .then(() => Promise.resolve(Actions.tabs()))
    .then(() => {
      const state = getState();
      return Promise.all([getMenu({venueId: state.activeNode.venueId}), getVenue({venueId: state.activeNode.venueId})])
    })
    .then(res => {
      console.log('gotMenu', res);
      res[0].Items.forEach(item => {
        dispatch(updateMenuItem(
          item.ItemName.S,
          item.ItemDescription.S,
          item.Price.N,
          (JSON.stringify(item.Tags.SS) === JSON.stringify(['NULL'])) ? [] :item.Tags.SS,
          item.Category.S,
          item.ItemId.S,
          item.VenueId.S,
          itemOptions = item.ItemOptions ? item.ItemOptions.S : null,
          item.TimeRanges.SS))});
      res[1].venue.Item.TimeRanges.L.forEach(timeRange =>
        dispatch(updateMenuRanges(timeRange.M.id.S, timeRange.M.range.S))
      );
      dispatch(updateMenuVisibility());

      const state = getState(),
        venueId = state.nodes.nodeList.filter(node => node.nodeId === state.activeNode.nodeId)[0].venueId,
        now = Date.now();
      dispatch(menuApiQueryStatus(venueId, now));
    })
    .then(res => writeToFirehose('NodeSelected'))
    .catch(err => {
      console.log(err);
      logger('error selecting node', err)})
};

export default selectNode