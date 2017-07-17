/**
 * Created by warren on 2/28/17.
 */
import {connect} from 'react-redux'
import {addToCartThunk} from '../middleware/cartThunk'
import MenuList from '../components/menuList'
import {Actions} from 'react-native-router-flux'
import * as _ from 'lodash'

const blueprint = (category) => {
  const mapStateToProps = (state) => {
    const venueId = _.find(state.nodes, ['nodeId', state.activeNode]).venueId;
    return {
      menuListItems: state.menu.filter(item => item.category === category && item.venueId === venueId),
      selectionsCount: _.sum(state.cart.map(item => item.count)),
      apiQueried: !!state.menuQueryStatus[venueId]
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      addToCart: (itemId) => dispatch(addToCartThunk(itemId)),
      checkout: () => Actions.cart()
    }
  };

  return connect(mapStateToProps, mapDispatchToProps)(MenuList)
};



export default blueprint