/**
 * Created by warren on 2/28/17.
 */
import {connect} from 'react-redux'
import {addToCartThunk} from '../middleware/cartThunk'
import MenuList from '../components/menuList'
import {Actions} from 'react-native-router-flux'
import oneClickBuyThunk from '../middleware/oneClickBuyThunk'
import * as _ from 'lodash'

const mapStateToProps = (state) => {
  const venueId = state.activeNode.venueId;
  return {
    menuListItems: state.menu,
    selectionsCount: _.sum(state.cart.map(item => item.count)),
    apiQueried: !!state.menuQueryStatus[venueId],
    defaultCardExists: state.defaultCardExists
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (itemId) => dispatch(addToCartThunk(itemId)),
    checkout: () => Actions.cart(),
    oneClickBuy: itemId => dispatch(oneClickBuyThunk(itemId))
  }
};

export default  connect(mapStateToProps, mapDispatchToProps)(MenuList)