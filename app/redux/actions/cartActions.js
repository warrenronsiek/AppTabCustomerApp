/**
 * Created by warren on 2/27/17.
 */

export const ADD_TO_CART = 'ADD_TO_CART';
export const addToCart = (itemName, itemDescription, price, tags, category, itemId, venueId) => {
  return {type: ADD_TO_CART, itemName, itemDescription, price, tags, category, itemId, venueId}
};