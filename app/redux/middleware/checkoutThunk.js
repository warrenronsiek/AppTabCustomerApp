/**
 * Created by warren on 4/24/17.
 */
import {Actions} from 'react-native-router-flux'
import logger from '../../api/loggingApi'
import {writeToFirehose} from '../../api/aws'
import {checkingOutComplete, checkingOut} from '../actions/cartActions'
import {isEmpty} from 'lodash'

export default checkoutThunk = () => (dispatch, getState) => {
  const state = getState();
  const customerId = state.auth.customerId, apiQueried = state.ccTokenApiQueried;
  if (!apiQueried) {
    return Promise.resolve(dispatch(checkingOut()))
      .then(() => {
        if (isEmpty(state.auth)) {
          Actions.login()
        } else {
          Actions.checkout()
        }
        return Promise.resolve()
      })
      .then(() => Promise.resolve(dispatch(checkingOutComplete())))
      .then(res => writeToFirehose('Checkout'))
      .catch(err => logger('error checking out', err))
  } else {
    return Actions.checkout()
  }
};