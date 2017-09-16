import {setActiveItem} from "../actions/menuActions"
import {Actions} from 'react-native-router-flux'
import oneClickBuyResolver from '../../common/oneClickBuyResolver'
import * as _ from 'lodash'

export default oneClickBuyThunk = (itemId) => (dispatch, getState) => {
  const item = {..._.find(_.flatten(getState().menu.map(section => section.data)), ['itemId', itemId])};

  if (item.itemOptions) {
    dispatch(setActiveItem(item.itemName, item.itemDescription, item.price, item.tags, item.category, item.itemId, item.venueId, item.itemOptions, true));
    Actions.optionsModal()
  } else {
    oneClickBuyResolver(item)(dispatch, getState)
  }
}