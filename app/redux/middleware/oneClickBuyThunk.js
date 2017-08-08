import logger from '../../api/loggingApi'
import {writeToFirehose} from '../../api/firehose'
import openTransaction from '../../api/openTransaction'
import round from '../../common/round'
import {oneClickBuy} from '../actions/cartActions'
import {find} from 'lodash'

export default oneClickBuyThunk = (itemId) => (dispatch, getState) => {
  const state = getState(),
    item = {...state.menu.filter(item => item.itemId === itemId)[0], count: 1},
    itemTotal = parseFloat(item.price),
    tip = round(itemTotal * state.additionalCosts.tip, 2),
    tax = round(itemTotal * state.additionalCosts.tax, 2),
    amount = parseInt(round((itemTotal + tip + tax) * 100, 2)),
    stripeToken = state.stripeToken,
    cardToken = state.ccTokens.filter(item => item.isSelected)[0].ccToken,
    nodeId = state.activeNode.nodeId,
    customerId = state.auth.customerId,
    venueId = find(state.nodes, ['nodeId', state.activeNode.nodeId]).venueId;

  Promise.resolve(dispatch(oneClickBuy(item.itemName, item.itemDescription, item.price, item.tags, item.category, item.itemId, item.venueId)))
    .then(res => openTransaction({
      amount,
      cardToken,
      stripeToken,
      nodeId,
      customerId,
      items: [item],
      tax,
      tip,
      itemTotal,
      venueId
    }))
    .then(res => writeToFirehose('OneClickBuy'))
    .catch(err => {
      console.log(err);
      logger('failed to one-click buy', err)
    })
}