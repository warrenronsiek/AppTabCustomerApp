/**
 * Created by warren on 2/24/17.
 */
export const UPDATE_MENU_ITEM = 'UPDATE_MENU_ITEM';
export const updateMenuItem = (itemName, itemDescription, price, tags, category, itemId, venueId, itemOptions) => {
  return {type: UPDATE_MENU_ITEM, itemName, itemDescription, price, tags, category, itemId, venueId, itemOptions: JSON.parse(itemOptions)}
};

export const MENU_API_QUERY_STATUS = 'MENU_API_QUERY_STATUS';
export const menuApiQueryStatus = (venueId, time) => {
  return {type: MENU_API_QUERY_STATUS, venueId, time}
};

export const SET_ACTIVE_ITEM = 'SET_ACTIVE_ITEM';
export const setActiveItem = (itemName, itemDescription, price, tags, category, itemId, venueId, itemOptions, oneClickBuy) => {
  return {type: SET_ACTIVE_ITEM, itemName, itemDescription, price, tags, category, itemId, venueId, itemOptions, oneClickBuy}
};

export const UPDATE_ACTIVE_ITEM_OPTIONS = 'UPDATE_ACTIVE_ITEM_OPTIONS';
export const updateActiveItemOptions = (itemOptions, price, allOptionsSelected) => {
  return {type: UPDATE_ACTIVE_ITEM_OPTIONS, itemOptions, price, allOptionsSelected}
};

export const CLEAR_ACTIVE_ITEM = 'CLEAR_ACTIVE_ITEM';
export const clearActiveItem = () => {
  return {type: CLEAR_ACTIVE_ITEM, }
};

