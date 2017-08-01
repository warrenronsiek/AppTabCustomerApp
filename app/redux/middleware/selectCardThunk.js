import setDefaultCard from '../../api/setDefaultCard'
import ccActions from '../actions/creditCardActions'
import logger from '../../api/loggingApi'

export default selectCard = (ccToken) => (dispatch, getState) => {
  const state = getState(),
    currentDefaultCard = state.ccTokens.filter(item => item.isSelected)[0].ccToken,
    customerId = state.auth.customerId;

  Promise.resolve(dispatch(ccActions.token.setSelected(ccToken)))
    .then(res => {
      setDefaultCard({customerId, currentDefaultCard, cardId: ccToken})
    })
    .catch(err => logger('error setting default card', err))

}