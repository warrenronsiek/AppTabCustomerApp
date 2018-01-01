/**
 * Created by warren on 2/28/17.
 */
import {addToCart} from '../actions/cartActions'
import {setActiveItem} from '../actions/menuActions'
import {Actions} from 'react-native-router-flux'

const _ = require('lodash');

const addToCartThunk = (itemId) => (dispatch, getState) => {

  const item = _.find(_.flatten(getState().menu.allItems.map(section => section.data)), ['itemId', itemId]);
  dispatch(setActiveItem({
    itemName: item.itemName,
    itemDescription: item.itemDescription,
    price: item.price,
    tags: item.tags,
    category: item.category,
    itemId: item.itemId,
    venueId: item.venueId,
    itemOptions: item.itemOptions,
    extendedDescription: item.extendedDescription,
    imageUrl: item.imageUrl
  }));
  Actions.optionsModal()

};

export {addToCartThunk}