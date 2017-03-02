/**
 * Created by warren on 2/27/17.
 */
import {updateMenuItem, menuApiQueryStatus} from '../redux/actions/menuActions';
import getMenu from '../api/getMenu';

export default (component) => {
  const state = component.context.store.getState();
  const venueId = state.nodes.filter(node => node.nodeId === state.activeNode)[0].venueId;
  const now = Math.floor(Date.now() / (1000 * 60 * 60)), last = state.menuQueryStatus[venueId];
  if (typeof last === 'undefined' || now - last > 1) {
    getMenu(venueId)
      .then(res => res.Items.forEach(item => component.props.dispatch(updateMenuItem(item.ItemName.S, item.ItemDescription.S, item.Price.N,
        item.Tags.SS, item.Category.S, item.ItemId.S, item.VenueId.S))))
      .then(() => component.props.dispatch(menuApiQueryStatus(venueId, last)))
      .catch(err => console.log(err))
  }
}