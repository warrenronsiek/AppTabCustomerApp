import {setActiveItem} from "../actions/menuActions"
import {Actions} from 'react-native-router-flux'
import oneClickBuyResolver from '../../common/oneClickBuyResolver'
import * as _ from 'lodash'

export default oneClickBuyThunk = (itemId) => (dispatch, getState) => {
  const item = {..._.find(_.flatten(getState().menu.map(section => section.data)), ['itemId', itemId])};
  console.log(item);
  console.log('hit oneclickbuy');
  if (item.itemOptions && (item.itemOptions !== 'NULL')) {
    dispatch(setActiveItem(item.itemName, item.itemDescription, item.price, item.tags, item.category, item.itemId, item.venueId, item.itemOptions, true));
    Actions.optionsModal()
  } else {
    console.log('called resolver');
    oneClickBuyResolver(item)(dispatch, getState)
  }
}