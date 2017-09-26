/**
 * Created by warren on 2/28/17.
 */
import {addToCart} from '../actions/cartActions'
import {setActiveItem} from '../actions/menuActions'
import {Actions} from 'react-native-router-flux'
const _ = require('lodash');

const addToCartThunk = (itemId) => (dispatch, getState) => {
  const item = _.find(_.flatten(getState().menu.map(section => section.data)), ['itemId', itemId]);
  if (item.itemOptions && (item.itemOptions !== 'NULL')) {
    dispatch(setActiveItem(item.itemName, item.itemDescription, item.price, item.tags, item.category, item.itemId, item.venueId, item.itemOptions));
    Actions.optionsModal()
  } else {
    dispatch(addToCart(item.itemName, item.itemDescription, item.price, item.tags, item.category, item.itemId, item.venueId, item.itemOptions))
  }
};

export {addToCartThunk}