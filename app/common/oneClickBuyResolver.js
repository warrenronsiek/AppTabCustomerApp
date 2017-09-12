import round from './round'
import {oneClickBuy} from "../redux/actions/cartActions"
import openTransaction from '../api/openTransaction'
import {writeToFirehose} from '../api/firehose'
import transactionActions from '../redux/actions/trasactionActions'
import * as _ from 'lodash'

const resolver = (item) => (dispatch, getState) => {
  const state = getState(),
    itemTotal = parseFloat(item.price),
    tip = round(itemTotal * state.additionalCosts.tip, 2),
    tax = round(itemTotal * state.additionalCosts.tax, 2),
    amount = parseInt(round((itemTotal + tip + tax) * 100, 2)),
    stripeToken = state.stripeToken,
    cardToken = state.ccTokens.filter(item => item.isSelected)[0].ccToken,
    nodeId = state.activeNode.nodeId,
    customerId = state.auth.customerId,
    venueId = _.find(state.nodes, ['nodeId', state.activeNode.nodeId]).venueId;

  Promise.resolve(dispatch(oneClickBuy(item.itemName, item.itemDescription, item.price, item.tags, item.category, item.itemId, item.venueId)))
    .then(res => openTransaction({
      amount,
      cardToken,
      stripeToken,
      nodeId,
      customerId,
      items: [{...item, count: 1}],
      tax,
      tip,
      itemTotal,
      venueId
    }))
    .then(res => {
      let transaction = res.transaction;
      return Promise.resolve(dispatch(transactionActions.update(transaction.transactionId, transaction.amount, transaction.items, transaction.createDate)))
    })
    .then(res => writeToFirehose('OneClickBuy'))
    .catch(err => {
      logger('failed to one-click buy', err)
    });
};

export default resolver