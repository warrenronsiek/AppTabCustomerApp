import {updateActiveItemOptions, clearActiveItem} from '../actions/menuActions'
import {addToCart} from '../actions/cartActions'
import {find, findIndex} from 'lodash'
import {Actions} from 'react-native-router-flux'
import centsIntToString from '../../common/centsIntToString'
import oneClickBuyResolver from '../../common/oneClickBuyResolver'

const menuItemOptionsUpdateThunk = (optionSetName, optionName) => (dispatch, getState) => {
  let activeItem = JSON.parse(JSON.stringify(getState().activeMenuItem));
  let itemOptions = [...activeItem.itemOptions];
  const optionSetIndex = findIndex(itemOptions, option => option.optionSetName === optionSetName);
  let previousSelectionPrice = 0;
  let previousSelection = find(itemOptions[optionSetIndex].data, ['isSelected', true]);
  const previousSelectionIndex = findIndex(itemOptions[optionSetIndex].data, ['isSelected', true]);
  if (previousSelection) {
    previousSelectionPrice = previousSelection.price;
    itemOptions[optionSetIndex].data[previousSelectionIndex].isSelected = false;
  }
  const subOptionIndex = findIndex(itemOptions[optionSetIndex].data, option => option.optionName === optionName);
  let option = itemOptions[optionSetIndex].data[subOptionIndex];
  let newPrice = centsIntToString(parseFloat(activeItem.price) * 100 + option.price - previousSelectionPrice);
  itemOptions[optionSetIndex].data[subOptionIndex] = {...option, isSelected: true};
  const allOptionsSelected = itemOptions.map(optionSet => optionSet.data.reduce((optionSelected, item) => optionSelected || item.isSelected, false)).reduce((allSelected, bool) => allSelected && bool, true);
  dispatch(updateActiveItemOptions(itemOptions, newPrice, allOptionsSelected));
};

const finishedMenuItemOptionsSelectionThunk = () => (dispatch, getState) => {
  const state = getState(), activeItem = state.activeMenuItem, oneClickBuy = activeItem.oneClickBuy;
  const newDescription = activeItem.itemOptions.map(optionSet => {
    const selected = find(optionSet.data, ['isSelected', true]);
    return optionSet.optionSetName + ': ' + selected.optionName
  });
  if (oneClickBuy) {
    oneClickBuyResolver(activeItem)(dispatch, getState)
  } else {
    dispatch(addToCart(activeItem.itemName, newDescription, activeItem.price, activeItem.tags, activeItem.category, activeItem.itemId, activeItem.venueId, activeItem.itemOptions));
  }
  Actions.pop();
};

export {menuItemOptionsUpdateThunk, finishedMenuItemOptionsSelectionThunk}