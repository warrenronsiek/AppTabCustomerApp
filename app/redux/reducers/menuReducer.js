/**
 * Created by warren on 2/24/17.
 */
import {UPDATE_MENU_ITEM} from '../actions/menuActions';
const _ = require('lodash');

const menu = (state = [], action) => {
  const oldItem = _.find(state, ['itemId', action.itemId]);
  switch (action.type) {
    case UPDATE_MENU_ITEM:
      console.log(action);
      if (oldItem) {
        return [...state.filter(item => item.itemId !== action.itemId),
          {
            itemName: action.itemName,
            itemDescription: action.itemDescription,
            itemId: action.itemId,
            venueId: action.venueId,
            tags: action.tags,
            price: action.price,
            category: action.category
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
          category: action.category
        }
      ];
    default:
      return state
  }
};

export {menu}