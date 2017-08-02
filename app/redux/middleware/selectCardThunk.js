import setDefaultCard from '../../api/setDefaultCard'
import ccActions from '../actions/creditCardActions'
import logger from '../../api/loggingApi'
import {get} from 'lodash'

export default selectCard = (ccToken) => (dispatch, getState) => {
  const state = getState(),
    customerId = state.auth.customerId,
    oldDefaultCardId = get(state.ccTokens.filter(item => item.isSelected)[0], 'ccToken', null);

  Promise.resolve(dispatch(ccActions.token.setSelected(ccToken)))
    .then(res => setDefaultCard({customerId, oldDefaultCardId, newDefaultCardId: ccToken}))
    .catch(err => logger('error setting default card', err))
}