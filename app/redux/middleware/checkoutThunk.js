/**
 * Created by warren on 4/24/17.
 */
import {Actions} from 'react-native-router-flux'
import ccActions from '../actions/creditCardActions'
import getCreditCards from '../../api/getCreditCards'
import logger from '../../api/loggingApi'

export default checkoutThunk = () => (dispatch, getState) => {
  const state = getState();
  const customerId = state.auth.clientId, apiQueried = state.ccTokenApiQueried;
  if (!apiQueried) {
    return getCreditCards(customerId)
      .then(res => {
        return Promise.all(res.Items.map(item => Promise.resolve(dispatch(ccActions.token.add(item.CardId.S, item.Last4.S, item.Brand.S, item.ExpMonth.N, item.ExpYear.N)))))
      })
      .then(res => Promise.resolve(dispatch(ccActions.apiQueried(true))))
      .then(() => Actions.checkout())
      .catch(err => logger(state, 'error checking out', err))
  } else {
    return Actions.checkout()
  }
};