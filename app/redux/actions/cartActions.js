/**
 * Created by warren on 2/27/17.
 */

export const ADD_TO_CART = 'ADD_TO_CART';
export const addToCart = (itemName, itemDescription, price, tags, category, itemId, venueId) => {
  return {type: ADD_TO_CART, itemName, itemDescription, price, tags, category, itemId, venueId}
};

export const INCREMENT_COUNT = 'INCREMENT_COUNT';
export const incrementCount = (itemId) => {
  return {type: INCREMENT_COUNT, itemId}
};

export const DECREMENT_COUNT = 'DECREMENT_COUNT';
export const decrementCount = (itemId) => {
  return {type: DECREMENT_COUNT, itemId}
};

export const UPDATE_SALES_TAX = 'UPDATE_SALES_TAX';
export const updateSalesTax = (tax) => {
  return {type: UPDATE_SALES_TAX, tax}
};

export const UPDATE_TIP = 'UPDATE_TIP';
export const updateTip = (tip) => {
  return {type: UPDATE_TIP, tip}
};

