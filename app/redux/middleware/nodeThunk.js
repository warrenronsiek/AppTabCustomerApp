/**
 * Created by warren on 1/23/17.
 */
import {Actions} from 'react-native-router-flux'
import {setActiveNode} from '../actions/nodeActions'
import {menuApiQueryStatus, updateMenuItem} from '../actions/menuActions'
import logger from '../../api/loggingApi'
import getMenu from '../../api/getMenu'

const selectNode = (nodeId) => (dispatch, getState) => {

  Promise.resolve(dispatch(setActiveNode(nodeId)))
    .then(() => Promise.resolve(Actions.tabs()))
    .then(() => {
      const state = getState(),
        venueId = state.nodes.filter(node => node.nodeId === state.activeNode)[0].venueId;
      console.log('calling getMenu');
      return getMenu({venueId})
    })
    .then(res => {
      console.log(res);
      return Promise.all(res.Items.map(item => Promise.resolve(dispatch(updateMenuItem(item.ItemName.S, item.ItemDescription.S, item.Price.N, item.Tags.SS, item.Category.S, item.ItemId.S, item.VenueId.S)))))
    })
    .then(res => {
      console.log('res', res);
      console.log('updated State: ', getState());
      const state = getState(),
        venueId = state.nodes.filter(node => node.nodeId === state.activeNode)[0].venueId,
        now = Date.now();
      component.props.dispatch(menuApiQueryStatus(venueId, now))
    })
    .catch(err => logger('error selecting node', err))
};

export default selectNode