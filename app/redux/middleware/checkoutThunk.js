/**
 * Created by warren on 4/24/17.
 */
import {Actions} from 'react-native-router-flux'
import ccActions from '../actions/creditCardActions'
import getCreditCards from '../../api/getCreditCards'
import logger from '../../api/loggingApi'
import {writeToFirehose} from '../../api/firehose'
import {checkingOutComplete, chekingOut} from '../actions/cartActions'

export default checkoutThunk = () => (dispatch, getState) => {
  const state = getState();
  const customerId = state.auth.customerId, apiQueried = state.ccTokenApiQueried;
  if (!apiQueried) {
    return Promise.resolve(dispatch(chekingOut()))
      .then(res => getCreditCards({customerId}))
      .then(res => {
        return Promise.all(res.Items.map(item => Promise.resolve(dispatch(ccActions.token.add(item.CardId.S, item.Last4.S, item.Brand.S, item.ExpMonth.N, item.ExpYear.N)))))
      })
      .then(res => Promise.resolve(dispatch(ccActions.apiQueried(true))))
      .then(() => Actions.checkout())
      .then(() => Promise.resolve(dispatch(checkingOutComplete())))
      .then(res => writeToFirehose('Checkout'))
      .catch(err => logger('error checking out', err))
  } else {
    return Actions.checkout()
  }
};