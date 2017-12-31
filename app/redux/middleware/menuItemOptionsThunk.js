import {updateActiveItemOptions} from '../actions/menuActions'
import {addToCart} from '../actions/cartActions'
import {find, findIndex} from 'lodash'
import {Actions} from 'react-native-router-flux'

const menuItemOptionsUpdateThunk = (optionSetId, optionId) => (dispatch, getState) => {
  let activeItem = JSON.parse(JSON.stringify(getState().activeMenuItem));
  let itemOptions = [...activeItem.itemOptions];
  const optionSetIndex = findIndex(itemOptions, option => option.optionSetId === optionSetId);
  let previousSelection = find(itemOptions[optionSetIndex].data, ['isSelected', true]);
  const previousSelectionIndex = findIndex(itemOptions[optionSetIndex].data, ['isSelected', true]);
  if (previousSelection) {
    itemOptions[optionSetIndex].data[previousSelectionIndex].isSelected = false;
  }
  const subOptionIndex = findIndex(itemOptions[optionSetIndex].data, option => option.optionId === optionId);
  let option = itemOptions[optionSetIndex].data[subOptionIndex];
  itemOptions[optionSetIndex].data[subOptionIndex] = {...option, isSelected: true};
  const allOptionsSelected = itemOptions.map(optionSet => optionSet.data.reduce((optionSelected, item) => optionSelected || item.isSelected, false)).reduce((allSelected, bool) => allSelected && bool, true);
  dispatch(updateActiveItemOptions(itemOptions, activeItem.price, allOptionsSelected));
};

const finishedMenuItemOptionsSelectionThunk = () => (dispatch, getState) => {
  const state = getState(), activeItem = state.activeMenuItem;
  const newDescription = activeItem.itemOptions.map(optionSet => {
    const selected = find(optionSet.data, ['isSelected', true]);
    return optionSet.optionSetName + ': ' + selected.optionName
  });
  dispatch(addToCart({
    itemName: activeItem.itemName,
    itemDescription: newDescription,
    price: activeItem.price,
    tags: activeItem.tags,
    category: activeItem.category,
    itemId: activeItem.itemId,
    venueId: activeItem.venueId,
    itemOptions: activeItem.itemOptions,
    count: activeItem.count
  }));
  Actions.pop();
};

export {menuItemOptionsUpdateThunk, finishedMenuItemOptionsSelectionThunk}