/**
 * Created by warren on 2/28/17.
 */
import {addToCart} from '../actions/cartActions';
const _ = require('lodash');

const addToCartThunk = (itemId) => (dispatch, getState) => {
  const item = _.find(getState().menu, ['itemId', itemId]);
  dispatch(addToCart(item.itemName, item.itemDescription, item.price, item.tags, item.category, item.itemId, item.venueId))
};

export {addToCartThunk}