/**
 * Created by warren on 2/27/17.
 */
import {connect} from 'react-redux';
import {addToCart} from '../actions/cartActions';
import MenuList from '../components/menuList';
const _ = require('lodash');

const mapStateToProps = (state) => {
  const venueId = _.find(state.nodes, ['nodeId', state.activeNode]);
  return {
    menuListItems: state.menu.filter(item => item.category === 'drink' && item.venueId === venueId)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (itemName, itemDescription, price, tags, category, itemId, venueId) =>
      dispatch(addToCart(itemName, itemDescription, price, tags, category, itemId, venueId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuList)