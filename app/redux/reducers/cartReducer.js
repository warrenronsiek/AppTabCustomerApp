/**
 * Created by warren on 2/28/17.
 */
import {
  ADD_TO_CART,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  UPDATE_SALES_TAX,
  UPDATE_TIP,
  CLEAR_CART,
  CHECKING_OUT_COMPLETE,
  CHEKING_OUT,
  ONE_CLICK_BUY
} from '../actions/cartActions'
import {SET_ACTIVE_NODE} from '../actions/nodeActions'
import * as _ from 'lodash'
import centsIntToString from '../../common/centsIntToString'
import round from '../../common/round'


const costsGenerator = (itemArray, tipPct, taxPct) => {
  let totalCart = itemArray.reduce((sum, item) => sum + (item.price * item.count ), 0),
    totalTip = round(totalCart * tipPct, 0),
    totalTax = round(totalCart * taxPct, 0),
    totalCost = totalCart + totalTip + totalTax;
  return {
    tax: taxPct,
    tip: tipPct,
    totalCart,
    totalTip,
    totalTax,
    totalCost,
    totalViewableCart: '$' + centsIntToString(totalCart),
    totalViewableCost: '$' + centsIntToString(totalCost),
    totalViewableTax: '$' + centsIntToString(totalTax),
    totalViewableTip: '$' + centsIntToString(totalTip)
  };
};

const cart = (state = {
  items: [],
  costs: {
    tip: .2,
    tax: .075,
    totalTip: 0,
    totalTax: 0,
    totalCart: 0,
    totalCost: 0,
    totalViewableTip: '$0',
    totalViewableTax: '$0',
    totalViewableCart: '$0',
    totalViewableCost: '$0'
  }
}, action) => {
  let inCart = _.find(state.items, item => (action.itemId === item.itemId) && (action.itemOptions === item.itemOptions));
  let filteredState = _.filter(state.items, item => (item.itemId !== action.itemId) || (action.itemOptions !== item.itemOptions));
  let newItem, newItems;
  switch (action.type) {
    case ADD_TO_CART:
      if (inCart) {
        newItem = {...inCart, count: inCart.count + 1};
        newItems = [...filteredState, newItem];
        return Object.assign({}, {
          items: newItems,
          costs: costsGenerator(newItems, state.costs.tip, state.costs.tax)
        })
      }
      newItems = [...filteredState, {
        itemId: action.itemId,
        itemName: action.itemName,
        itemDescription: action.itemDescription,
        viewablePrice: '$' + centsIntToString(action.price),
        price: action.price,
        tags: action.tags,
        category: action.category,
        venueId: action.venueId,
        itemOptions: action.itemOptions,
        count: 1
      }].sort((a, b) => a.itemName.localeCompare(b.itemName));
      return Object.assign({}, {items: newItems, costs: costsGenerator(newItems, state.costs.tip, state.costs.tax)});
    case INCREMENT_COUNT:
      newItem = {...inCart, count: inCart.count + 1};
      newItems = [...filteredState, newItem];
      return Object.assign({}, {items: newItems, costs: costsGenerator(newItems, state.costs.tip, state.costs.tax)});
    case DECREMENT_COUNT:
      newItem = {...inCart, count: inCart.count - 1};
      newItems = [...filteredState, newItem].sort((a, b) => a.itemName.localeCompare(b.itemName));
      if (inCart.count > 0) {
        return Object.assign({}, {items: newItems, costs: costsGenerator(newItems, state.costs.tip, state.costs.tax)});
      }
      return Object.assign({}, {items: filteredState, costs: costsGenerator(newItems, state.costs.tip, state.costs.tax)});
    case SET_ACTIVE_NODE:
      return {...state, items: [...state.items.filter(item => item.venueId === action.venueId)]};
    case UPDATE_TIP:
      return {...state, costs: costsGenerator(state.items, action.tip, state.costs.tax)};
    case CLEAR_CART:
      return Object.assign({}, {items: [], costs: costsGenerator([], state.costs.tip, state.costs.tax)});
    default:
      return state
  }
};

const numberOfCartItems = (state = 0, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return state + 1;
    case INCREMENT_COUNT:
      return state + 1;
    case DECREMENT_COUNT:
      return state - 1;
    case CLEAR_CART:
      return 0;
    default:
      return state
  }
};

const oneClickBuyItem = (state = {}, action) => {
  switch (action.type) {
    case ONE_CLICK_BUY:
      return {
        itemId: action.itemId,
        itemName: action.itemName,
        itemDescription: action.itemDescription,
        price: action.price,
        tags: action.tags,
        category: action.category,
        venueId: action.venueId
      };
    default:
      return state
  }
};

const cartStatus = (state = {}, action) => {
  switch (action.type) {
    case CHEKING_OUT:
      return {checkingOut: true};
    case CHECKING_OUT_COMPLETE:
      return {checkingOut: false};
    default:
      return state
  }
};

export {cart, cartStatus, oneClickBuyItem, numberOfCartItems}