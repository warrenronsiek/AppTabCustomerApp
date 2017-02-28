/**
 * Created by warren on 2/24/17.
 */
export const UPDATE_MENU_ITEM = 'UPDATE_MENU_ITEM';
export const updateMenuItem = (itemName, itemDescription, price, tags, category, itemId, venueId) => {
  return {type: UPDATE_MENU_ITEM, itemName, itemDescription, price, tags, category, itemId, venueId}
};