/**
 * Created by warren on 2/28/17.
 */
import {connect} from 'react-redux'
import {addToCartThunk} from '../middleware/cartThunk'
import MenuList from '../components/menuList'

const mapStateToProps = (state) => {
  const venueId = state.activeNode.venueId;
  return {
    menuListItems: state.menu.visibleMenu,
    selectionsCount: state.numberOfCartItems,
    apiQueried: !!state.menuQueryStatus[venueId],
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (itemId) => dispatch(addToCartThunk(itemId))
  }
};

export default  connect(mapStateToProps, mapDispatchToProps)(MenuList)