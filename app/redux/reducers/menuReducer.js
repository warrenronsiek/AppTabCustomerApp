/**
 * Created by warren on 2/24/17.
 */
import {
  UPDATE_MENU_ITEM,
  MENU_API_QUERY_STATUS,
  SET_ACTIVE_ITEM,
  UPDATE_ACTIVE_ITEM_OPTIONS,
  CLEAR_ACTIVE_ITEM
} from '../actions/menuActions';

const _ = require('lodash');

/**
 * itemOptions is of shape:
 [
 {
   "optionSetName": "burger",
   "data": [
     {
       "optionName": "rare",
       "price": 0,
       "isSelected": false,
       "optionSetName": "burger"
     },
     {
       "optionName": "medium",
       "price": 0,
       "isSelected": false,
       "optionSetName": "burger"
     },
     {
       "optionName": "well-done",
       "price": 0,
       "isSelected": false,
       "optionSetName": "burger"
     }
   ]
 },
 {
   "optionSetName": "avocado",
   "data": [
     {
       "optionName": "yes",
       "price": 200,
       "isSelected": false,
       "optionSetName": "avocado"
     },
     {
       "optionName": "no",
       "price": 0,
       "isSelected": false,
       "optionSetName": "avocado"
     }
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
      console.log(action);
      return {
        itemName: action.itemName,
        itemDescription: action.itemDescription,
        itemId: action.itemId,
        venueId: action.venueId,
        tags: action.tags,
        price: action.price,
        viewablePrice: '$' + action.price,
        category: action.category,
        itemOptions: action.itemOptions,
        allOptionsSelected: false
      };
    case UPDATE_ACTIVE_ITEM_OPTIONS:
      console.log(action);
      return {
        ...state,
        itemOptions: action.itemOptions,
        price: action.price,
        viewablePrice: '$' + action.price,
        allOptionsSelected: action.allOptionsSelected
      };
    case CLEAR_ACTIVE_ITEM:
      return {};
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