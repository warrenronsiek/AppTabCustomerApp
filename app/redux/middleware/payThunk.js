/**
 * Created by warren on 5/5/17.
 */
import stripeChargeCard from '../../api/stripeChargeCard'
import * as _ from 'lodash'
import {Actions} from 'react-native-router-flux'

const payThunk = () => (dispatch, getState) => {
  const state = getState();
  const
    venueId = _.find(state.nodes, ['nodeId', state.activeNode]).venueId,
    currentCart = state.cart.filter(item => item.venueId === venueId);
  const
    amount = Math.round(_.sum(currentCart.map(item => parseFloat(item.price) * item.count)) * 100),
    stripeToken = state.stripeToken,
    cardToken = state.ccTokens.filter(item => item.isSelected)[0].ccToken,
    nodeId = state.activeNode,
    customerId = state.auth.clientId;

  return stripeChargeCard(amount, stripeToken, cardToken, nodeId, customerId, currentCart)
    .then(res => {
      if (res.message === 'CreditCardChargeSuccessful') {Actions.placeholder()}
      else {console.log('wrong response')}
    })
    .catch(err => console.log(err))

};

export default payThunk