/**
 * Created by warren on 2/24/17.
 */
import {UPDATE_MENU_ITEM, MENU_API_QUERY_STATUS, SET_ACTIVE_ITEM, UPDATE_ACTIVE_ITEM_OPTIONS} from '../actions/menuActions';
const _ = require('lodash');

/**
 * itemOptions is of shape:
 [
 {
   optionSetName: 'burger',
   options: [
     {optionName: 'rare', price: 0, isSelected: false},
     {optionName: 'medium', price: 0, isSelected: false},
     {optionName: 'well-done', price: 0, isSelected: false}
   ]
 },
 {
   optionSetName: 'avocado',
   options: [
     {optionName: 'yes', price: 200, isSelected: false},
     {optionName: 'no', price: 0, isSelected: false}
   ]
 }
 ]
 */

const menu = (state = [], action) => {
  const oldItem = _.find(state, ['itemId', action.itemId]);
  switch (action.type) {
    case UPDATE_MENU_ITEM:
      if (oldItem) {
        return [...state.filter(item => item.itemId !== action.itemId),
          {
            itemName: action.itemName,
            itemDescription: action.itemDescription,
            itemId: action.itemId,
            venueId: action.venueId,
            tags: action.tags,
            price: action.price,
            category: action.category,
            itemOptions: action.itemOptions
          }
        ]
      }
      return [...state,
        {
          itemName: action.itemName,
          itemDescription: action.itemDescription,
          itemId: action.itemId,
          venueId: action.venueId,
          tags: action.tags,
          price: action.price,
          category: action.category,
          itemOptions: action.itemOptions
        }
      ];
    default:
      return state
  }
};

const activeMenuItem = (state = {}, action) => {
  switch (action.type) {
    case SET_ACTIVE_ITEM:
      return {
        itemName: action.itemName,
        itemDescription: action.itemDescription,
        itemId: action.itemId,
        venueId: action.venueId,
        tags: action.tags,
        price: action.price,
        category: action.category,
        itemOptions: action.itemOptions
      };
    case UPDATE_ACTIVE_ITEM_OPTIONS:
      return {...state, itemOptions: action.itemOptions, price: action.price};
    default:
      return state
  }
};

const menuQueryStatus = (state = {}, action) => {
  switch (action.type) {
    case MENU_API_QUERY_STATUS:
      const newState = Object.assign({}, state);
      newState[action.venueId] = action.time;
      return newState;
    default:
      return state;
  }
};

export {menu, menuQueryStatus, activeMenuItem}