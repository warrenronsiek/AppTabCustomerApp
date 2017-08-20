/**
 * Created by warren on 2/28/17.
 */
import {addToCart} from '../actions/cartActions'
import {setActiveItem} from '../actions/menuActions'
import {Actions} from 'react-native-router-flux'
const _ = require('lodash');

const addToCartThunk = (itemId) => (dispatch, getState) => {
  const item = _.find(getState().menu, ['itemId', itemId]);
  if (item.itemOptions) {
    dispatch(setActiveItem(item.itemName, item.itemDescription, item.price, item.tags, item.category, item.itemid, item.venueId, item.itemOptions));
    Actions.optionsModal()
  } else {
    dispatch(addToCart(item.itemName, item.itemDescription, item.price, item.tags, item.category, item.itemId, item.venueId))
  }
};

export {addToCartThunk}