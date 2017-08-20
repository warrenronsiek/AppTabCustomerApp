import {updateActiveItemOptions} from '../actions/menuActions'
import {addToCart} from '../actions/cartActions'
import {find, findIndex} from 'lodash'
import {Actions} from 'react-native-router-flux'
import round from '../../common/round'
import centsIntToString from '../../common/centsIntToString'

const menuItemOptionsUpdateThunk = (optionSetName, optionName) => (dispatch, getState) => {
  const activeItem = getState().activeMenuItem;
  let itemOptions = [...activeItem.itemOptions];
  const optionSetIndex = findIndex(itemOptions, option => option.optionSetName === optionSetName);
  let previousSelectionPrice = 0;
  let previousSelection = find(itemOptions[optionSetIndex].options, ['isSelected', true]);
  if (previousSelection) {
    previousSelectionPrice = previousSelection.price;
    itemOptions[optionSetIndex].options = [
      ...itemOptions[optionSetIndex].options.filter(option => option.isSelected === false),
      {...previousSelection, isSelected: false}
    ]
  }
  const subOptionIndex = findIndex(itemOptions[optionSetIndex].options, option => option.optionName === optionName);
  let option = itemOptions[optionSetIndex].options[subOptionIndex];
  let newPrice = centsIntToString(round(parseFloat(activeItem.price) * 100 + option.price - previousSelectionPrice));
  itemOptions[optionSetIndex].options[subOptionIndex] = {...option, isSelected: true};
  dispatch(updateActiveItemOptions(itemOptions, newPrice))
};

const finishedMenuItemOptionsSelectionThunk = () => (dispatch, getState) => {
  const activeItem = getState().activeMenuItem;
  const newDescription = activeItem.itemOptions.map(optionSet => {
    const selected = find(optionSet.options, ['isSelected', true]);
    return optionSet.optionSetName + ': ' + selected.optionName
  });
  dispatch(addToCart(activeItem.itemName, newDescription, activeItem.price, activeItem.tags, activeItem.category, activeItem.itemId, activeItem.venueId));
  Actions.pop();
};

export {menuItemOptionsUpdateThunk, finishedMenuItemOptionsSelectionThunk}