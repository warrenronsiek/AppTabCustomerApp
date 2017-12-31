/**
 * Created by warren on 2/24/17.
 */
import {
  UPDATE_MENU_ITEM,
  MENU_API_QUERY_STATUS,
  SET_ACTIVE_ITEM,
  UPDATE_ACTIVE_ITEM_OPTIONS,
  CLEAR_ACTIVE_ITEM,
  UPDATE_MENU_RANGES,
  UPDATE_MENU_VISIBILITY,
  INCREMENT_ACTIVE_ITEM_COUNT,
  DECREMENT_ACTIVE_ITEM_COUNT
} from '../actions/menuActions';
import centsIntToString from '../../common/centsIntToString';

const _ = require('lodash');

/**
 * itemOptions is of shape:
 [
 {
   "optionSetName": "Sides",
   "optionSetId": 0,
   "data": [
     {
       "optionName": "Salad",
       "price": 0,
       "optionId": 0
     },
     {
       "optionName": "Slaw",
       "price": 0,
       "optionId": 1
     }
   ]
 },
 {
   "optionSetName": "Fries",
   "optionSetId": 1,
   "data": [
     {
       "optionName": "Regular",
       "price": 0,
       "optionId": 0
     },
     {
       "optionName": "Curley",
       "price": 200,
       "optionId": 1
     },
     {
       "optionName": "Garlic",
       "price": 300,
       "optionId": 2
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

const inRange = range => {
  let now = new Date();
  let minutesElapsed = now.getHours() * 60 + now.getMinutes();
  let min, max;
  [min, max] = range.split('-').map(time => parseInt(time.substring(0, 2)) * 60 + parseInt(time.substring(3, 5)));
  return (minutesElapsed >= min) && (minutesElapsed < max)
};

const menu = (state = {allItems: [], visibleMenu: [], menuRanges: {}}, action) => {
  switch (action.type) {
    case UPDATE_MENU_RANGES:
      return {
        ...state,
        menuRanges: {...state.menuRanges, [action.id]: action.range}
      };
    case UPDATE_MENU_VISIBILITY:
      return {
        ...state, visibleMenu: state.allItems.map(section => {
          let newData = section.data.filter(item => {
            let boolList = item.timeRanges.map(timeRangeId => inRange(state.menuRanges[timeRangeId]));
            return boolList.reduce((accum, bool) => accum || bool, false)
          });
          return {...section, data: newData}
        })
      };
    case UPDATE_MENU_ITEM:
      const section = _.find(state.allItems, ['category', action.category]);
      const oldItem = _.find(_.get(section, 'data'), ['itemId', action.itemId]);
      if (oldItem) {
        return {
          ...state, allItems: [...state.allItems.filter(section => section.category !== action.category),
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
                  itemOptions: action.itemOptions,
                  timeRanges: action.timeRanges,
                  extendedDescription: action.extendedDescription,
                  imageUrl: action.imageUrl
                }
              ], category: action.category
            }
          ]
        }
      }
      if (section) {
        return {
          ...state, allItems: [...state.allItems.filter(section => section.category !== action.category),
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
                  itemOptions: action.itemOptions,
                  timeRanges: action.timeRanges,
                  extendedDescription: action.extendedDescription,
                  imageUrl: action.imageUrl
                }
              ], category: action.category
            }
          ]
        }
      }
      return {
        ...state, allItems: [...state.allItems,
          {
            data: [{
              itemName: action.itemName,
              itemDescription: action.itemDescription,
              itemId: action.itemId,
              venueId: action.venueId,
              tags: action.tags,
              price: action.price,
              viewablePrice: '$' + centsIntToString(action.price),
              category: action.category,
              itemOptions: action.itemOptions,
              timeRanges: action.timeRanges,
              extendedDescription: action.extendedDescription,
              imageUrl: action.imageUrl,
            }], category: action.category
          }
        ]
      };
    default:
      return state
  }
};

const activeMenuItem = (state = {}, action) => {
  switch (action.type) {
    case SET_ACTIVE_ITEM:
      return {
        itemName: action.payload.itemName,
        itemDescription: action.payload.itemDescription,
        itemId: action.payload.itemId,
        venueId: action.payload.venueId,
        tags: action.payload.tags,
        price: action.payload.price,
        viewablePrice: '$' + centsIntToString(action.payload.price),
        category: action.payload.category,
        itemOptions: action.payload.itemOptions.map(optionSet => ({
          ...optionSet,
          data: optionSet.data.map(option => ({...option, isSelected: false, optionSetId: optionSet.optionSetId}))
        })),
        allOptionsSelected: false,
        extendedDescription: action.payload.extendedDescription,
        imageUrl: action.payload.imageUrl,
        count: 1
      };
    case UPDATE_ACTIVE_ITEM_OPTIONS:
      return {
        ...state,
        itemOptions: action.itemOptions,
        price: action.price,
        viewablePrice: '$' + centsIntToString(action.price),
        allOptionsSelected: action.allOptionsSelected
      };
    case INCREMENT_ACTIVE_ITEM_COUNT:
      return {
        ...state, count: state.count + 1
      };
    case DECREMENT_ACTIVE_ITEM_COUNT:
      if (state.count > 1) {
        return {...state, count: state.count - 1};
      }
      return state;
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