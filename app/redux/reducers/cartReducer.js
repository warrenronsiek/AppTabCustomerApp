/**
 * Created by warren on 2/28/17.
 */
import {
  ADD_TO_CART,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  UPDATE_SALES_TAX,
  UPDATE_TIP
} from '../actions/cartActions';

const _ = require('lodash');

const cart = (state = [], action) => {
  let inCart = _.find(state, ['itemId', action.itemId]);
  let filteredState = _.filter(state, item => item.itemId !== action.itemId);
  let newItem;
  switch (action.type) {
    case ADD_TO_CART:
      if (inCart) {
        newItem = {...inCart, count: inCart.count + 1};
        return [...filteredState, newItem]
      }
      return [...state, {
        itemId: action.itemId,
        itemName: action.itemName,
        itemDescription: action.itemDescription,
        price: action.price,
        tags: action.tags,
        category: action.category,
        venueId: action.venueId,
        count: 1
      }];
    case INCREMENT_COUNT:
      newItem = {...inCart, count: inCart.count + 1};
      return [newItem, ...filteredState].sort((a, b) => a.itemName.localeCompare(b.itemName));
    case DECREMENT_COUNT:
      newItem = {...inCart, count: inCart.count - 1};
      if (inCart.count > 0) {
        return [newItem, ...filteredState].sort((a, b) => a.itemName.localeCompare(b.itemName));
      }
      return filteredState;
    default:
      return state
  }
};

const additionalCosts = (state = {tip: .2, tax: .0725}, action) => {
  switch (action.type) {
    case UPDATE_TIP:
      return {...state, tip: action.tip};
    case UPDATE_SALES_TAX:
      return {...state, tax: action.tax};
    default:
      return state
  }
};

export {cart, additionalCosts}