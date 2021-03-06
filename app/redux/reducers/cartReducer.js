/**
 * Created by warren on 2/28/17.
 */
import {
  ADD_TO_CART,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  UPDATE_TIP,
  CLEAR_CART,
  CHECKING_OUT_COMPLETE,
  CHECKING_OUT,
  TOGGLE_INCREMENTER
} from '../actions/cartActions'
import {SET_ACTIVE_NODE} from '../actions/nodeActions'
import * as _ from 'lodash'
import centsIntToString from '../../common/centsIntToString'
import round from '../../common/round'
import uuid from 'react-native-uuid'

const costsGenerator = (itemArray, tipPct, taxPct) => {
  let totalCart = itemArray
      .reduce((sum, item) => sum + (
        (parseFloat(item.price) + (Array.isArray(item.itemOptions) ? item.itemOptions.reduce((sum, option) => sum + option.price, 0) : 0)) * item.count)
        , 0),
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

const selectedOptionsGetter = optionSets => {
  try {
    return optionSets
      .map(optionSet => ({
        ...optionSet.data.filter(option => option.isSelected)[0],
        optionSetName: optionSet.optionSetName,
        optionSetId: optionSet.optionSetId
      }))
      .map(displayOption => ({
        ...displayOption,
        viewablePrice: '$' + centsIntToString(displayOption.price),
        key: displayOption.optionSetId.toString() + displayOption.optionId.toString()
      }));
  } catch (err) {
    return 'NULL'
  }
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
  },
  numberOfCartItems: 0,
  transactionId: ''
}, action) => {
  let newItem, newItems, inCart, filteredState;
  switch (action.type) {
    case ADD_TO_CART:
      inCart = _.find(state.items, item => (action.payload.itemId === item.itemId) && (JSON.stringify(action.payload.itemOptions) === JSON.stringify(item.itemOptions)));
      filteredState = _.filter(state.items, item => (item.itemId !== action.payload.itemId) || (JSON.stringify(action.payload.itemOptions) !== JSON.stringify(item.itemOptions)));
      if (inCart) {
        newItem = {...inCart, count: inCart.count + action.payload.count};
        newItems = [...filteredState, newItem];
        return Object.assign({}, {
          items: newItems,
          costs: costsGenerator(newItems, state.costs.tip, state.costs.tax),
          numberOfCartItems: newItems.reduce((sum, item) => sum + item.count, 0)
        })
      }
      newItems = [...filteredState, {
        itemId: action.payload.itemId,
        itemName: action.payload.itemName,
        itemDescription: action.payload.itemDescription,
        viewablePrice: '$' + centsIntToString(action.payload.price),
        price: action.payload.price,
        tags: action.payload.tags,
        category: action.payload.category,
        venueId: action.payload.venueId,
        showIncrementer: false,
        itemOptions: selectedOptionsGetter(action.payload.itemOptions),
        count: action.payload.count
      }].sort((a, b) => a.itemName.localeCompare(b.itemName));
      return Object.assign({}, {
        items: newItems,
        costs: costsGenerator(newItems, state.costs.tip, state.costs.tax),
        numberOfCartItems: newItems.reduce((sum, item) => sum + item.count, 0),
        transactionId: uuid.v4().slice(-12)
      });
    case INCREMENT_COUNT:
      inCart = _.find(state.items, item => (action.payload.itemId === item.itemId) && (JSON.stringify(action.payload.itemOptions) === JSON.stringify(item.itemOptions)));
      filteredState = _.filter(state.items, item => (item.itemId !== action.payload.itemId) || (JSON.stringify(action.payload.itemOptions) !== JSON.stringify(item.itemOptions)));
      newItem = {...inCart, count: inCart.count + 1};
      newItems = [...filteredState, newItem].sort((a, b) => a.itemName.localeCompare(b.itemName));
      return Object.assign({}, {
        items: newItems,
        costs: costsGenerator(newItems, state.costs.tip, state.costs.tax),
        numberOfCartItems: state.numberOfCartItems + 1
      });
    case DECREMENT_COUNT:
      inCart = _.find(state.items, item => (action.payload.itemId === item.itemId) && (JSON.stringify(action.payload.itemOptions) === JSON.stringify(item.itemOptions)));
      filteredState = _.filter(state.items, item => (item.itemId !== action.payload.itemId) || (JSON.stringify(action.payload.itemOptions) !== JSON.stringify(item.itemOptions)));
      newItem = {...inCart, count: inCart.count - 1};
      newItems = [...filteredState, newItem].sort((a, b) => a.itemName.localeCompare(b.itemName));
      if (inCart.count > 0) {
        return Object.assign({}, {
          items: newItems,
          costs: costsGenerator(newItems, state.costs.tip, state.costs.tax),
          numberOfCartItems: newItems.reduce((sum, item) => sum + item.count, 0)
        });
      }
      return Object.assign({}, {
        items: filteredState,
        costs: costsGenerator(filteredState, state.costs.tip, state.costs.tax),
        numberOfCartItems: filteredState.reduce((sum, item) => sum + item.count, 0)
      });
    case SET_ACTIVE_NODE:
      return {...state, items: [...state.items.filter(item => item.venueId === action.venueId)]};
    case UPDATE_TIP:
      return {...state, costs: costsGenerator(state.items, action.payload.tip, state.costs.tax)};
    case CLEAR_CART:
      return Object.assign({}, {
        items: [],
        costs: costsGenerator([], state.costs.tip, state.costs.tax),
        numberOfCartItems: 0,
        transactionId: ''
      });
    case TOGGLE_INCREMENTER:
      inCart = _.find(state.items, item => (action.payload.itemId === item.itemId) && (JSON.stringify(action.payload.itemOptions) === JSON.stringify(item.itemOptions)));
      filteredState = _.filter(state.items, item => (item.itemId !== action.payload.itemId) || (JSON.stringify(action.payload.itemOptions) !== JSON.stringify(item.itemOptions)));
      newItem = {...inCart, showIncrementer: !inCart.showIncrementer};
      newItems = [...filteredState, newItem].sort((a, b) => a.itemName.localeCompare(b.itemName));
      return {...state, items: newItems};
    default:
      return state
  }
};

const cartStatus = (state = {}, action) => {
  switch (action.type) {
    case CHECKING_OUT:
      return {checkingOut: true};
    case CHECKING_OUT_COMPLETE:
      return {checkingOut: false};
    default:
      return state
  }
};

export {cart, cartStatus}