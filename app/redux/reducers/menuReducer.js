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
import centsIntToString from '../../common/centsIntToString';
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

/**
 * menu state is of shape:
 * [
 *  {data: [
 *          {
              itemName: itemName,
              itemDescription: itemDescription,
              itemId: itemId,
              venueId: venueId,
              tags: tags,
              price: price,
              category: category,
              itemOptions: itemOptions
            }
 *    ],
 *   category: 'main'},
 *  {data: [], category: 'drink'},
 * ]
 */

const menu = (state = [], action) => {
  switch (action.type) {
    case UPDATE_MENU_ITEM:
      const section = _.find(state, ['category', action.category]);
      const oldItem = _.find(_.get(section, 'data'), ['itemId', action.itemId]);
      if (oldItem) {
        return [...state.filter(section => section.category !== action.category),
          {
            data: [
              ...section.data.filter(item => item.itemId !== action.itemId),
              {
                itemName: action.itemName,
                itemDescription: action.itemDescription,
                itemId: action.itemId,
                venueId: action.venueId,
                tags: action.tags,
                viewablePrice: '$' + centsIntToString(action.price),
                price: action.price,
                category: action.category,
                itemOptions: action.itemOptions
              }
            ], category: action.category
          }
        ]
      }
      if (section) {
        return [...state.filter(section => section.category !== action.category),
          {
            data: [
              ...section.data,
              {
                itemName: action.itemName,
                itemDescription: action.itemDescription,
                itemId: action.itemId,
                venueId: action.venueId,
                viewablePrice: '$' + centsIntToString(action.price),
                tags: action.tags,
                price: action.price,
                category: action.category,
                itemOptions: action.itemOptions
              }
            ], category: action.category
          }
        ]
      }
      return [...state,
        {data: [{
          itemName: action.itemName,
          itemDescription: action.itemDescription,
          itemId: action.itemId,
          venueId: action.venueId,
          tags: action.tags,
          price: action.price,
          viewablePrice: '$' + centsIntToString(action.price),
          category: action.category,
          itemOptions: action.itemOptions
        }], category: action.category}
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
        viewablePrice: '$' + action.price,
        category: action.category,
        itemOptions: action.itemOptions,
        allOptionsSelected: false,
        oneClickBuy: action.oneClickBuy || false
      };
    case UPDATE_ACTIVE_ITEM_OPTIONS:
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