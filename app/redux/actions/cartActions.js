/**
 * Created by warren on 2/27/17.
 */

export const ADD_TO_CART = 'ADD_TO_CART';
export const addToCart = (itemName, itemDescription, price, tags, category, itemId, venueId, itemOptions) => {
  return {type: ADD_TO_CART, itemName, itemDescription, price, tags, category, itemId, venueId, itemOptions}
};

export const INCREMENT_COUNT = 'INCREMENT_COUNT';
export const incrementCount = (itemId, itemOptions) => {
  return {type: INCREMENT_COUNT, itemId, itemOptions}
};

export const DECREMENT_COUNT = 'DECREMENT_COUNT';
export const decrementCount = (itemId, itemOptions) => {
  return {type: DECREMENT_COUNT, itemId, itemOptions}
};

export const UPDATE_SALES_TAX = 'UPDATE_SALES_TAX';
export const updateSalesTax = (tax) => {
  return {type: UPDATE_SALES_TAX, tax}
};

export const UPDATE_TIP = 'UPDATE_TIP';
export const updateTip = (tip) => {
  return {type: UPDATE_TIP, tip}
};

export const CLEAR_CART = 'CLEAR_CART';
export const clearCart = () => {
  return {type: CLEAR_CART, }
};

export const CHEKING_OUT = 'CHEKING_OUT';
export const chekingOut = () => {
  return {type: CHEKING_OUT, }
};

export const CHECKING_OUT_COMPLETE = 'CHECKING_OUT_COMPLETE';
export const checkingOutComplete = () => {
  return {type: CHECKING_OUT_COMPLETE, }
};

export const ONE_CLICK_BUY = 'ONE_CLICK_BUY';
export const oneClickBuy = (itemName, itemDescription, price, tags, category, itemId, venueId) => {
  return {type: ONE_CLICK_BUY, itemName, itemDescription, price, tags, category, itemId, venueId}
};

