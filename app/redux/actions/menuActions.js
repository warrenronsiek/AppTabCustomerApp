/**
 * Created by warren on 2/24/17.
 */
export const UPDATE_MENU_ITEM = 'UPDATE_MENU_ITEM';
export const updateMenuItem = ({itemName, itemDescription, price, tags, category, itemId, venueId, itemOptions, timeRanges, extendedDescription, imageUrl}) => {
  return {
    type: UPDATE_MENU_ITEM,
    payload: {
      itemName,
      itemDescription,
      price,
      tags,
      category,
      itemId,
      venueId,
      itemOptions: JSON.parse(itemOptions),
      timeRanges,
      extendedDescription,
      imageUrl
    }
  }
};

export const MENU_API_QUERY_STATUS = 'MENU_API_QUERY_STATUS';
export const menuApiQueryStatus = (venueId, time) => {
  return {type: MENU_API_QUERY_STATUS, venueId, time}
};

export const SET_ACTIVE_ITEM = 'SET_ACTIVE_ITEM';
export const setActiveItem = ({itemName, itemDescription, price, tags, category, itemId, venueId, itemOptions, extendedDescription, imageUrl}) => {
  return {
    type: SET_ACTIVE_ITEM,
    payload: {
      itemName,
      itemDescription,
      price,
      tags,
      category,
      itemId,
      venueId,
      itemOptions,
      extendedDescription,
      imageUrl
    }
  }
};

export const INCREMENT_ACTIVE_ITEM_COUNT = 'INCREMENT_ACTIVE_ITEM_COUNT';
export const incrementActiveItemCount = () => {
  return {type: INCREMENT_ACTIVE_ITEM_COUNT,}
};

export const DECREMENT_ACTIVE_ITEM_COUNT = 'DECREMENT_ACTIVE_ITEM_COUNT';
export const decrementActiveItemCount = () => {
  return {type: DECREMENT_ACTIVE_ITEM_COUNT,}
};

export const UPDATE_ACTIVE_ITEM_OPTIONS = 'UPDATE_ACTIVE_ITEM_OPTIONS';
export const updateActiveItemOptions = (itemOptions, price, allOptionsSelected) => {
  return {type: UPDATE_ACTIVE_ITEM_OPTIONS, itemOptions, price, allOptionsSelected}
};

export const CLEAR_ACTIVE_ITEM = 'CLEAR_ACTIVE_ITEM';
export const clearActiveItem = () => {
  return {type: CLEAR_ACTIVE_ITEM,}
};

export const UPDATE_MENU_RANGES = 'UPDATE_MENU_RANGES';
export const updateMenuRanges = (id, range) => {
  return {type: UPDATE_MENU_RANGES, id, range}
};

export const UPDATE_MENU_VISIBILITY = 'UPDATE_MENU_VISIBILITY';
export const updateMenuVisibility = () => {
  return {type: UPDATE_MENU_VISIBILITY,}
};

