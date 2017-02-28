/**
 * Created by warren on 2/27/17.
 */
import {updateMenuItem} from '../redux/actions/menuActions';
import getMenu from '../api/getMenu';

export default (component) => {
  const state = component.context.store.getState();
  const venueId = state.nodes.filter(node => node.nodeId === state.activeNode)[0].venueId;
  getMenu(venueId)
    .then(res => res.Items.forEach(item => component.props.dispatch(updateMenuItem(item.ItemName.S, item.ItemDescription.S, item.Price.N,
      item.Tags.SS, item.Category.S, item.ItemId.S, item.VenueId.S))))
    .catch(err => console.log(err))
}