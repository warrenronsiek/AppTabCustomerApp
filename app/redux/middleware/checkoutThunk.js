/**
 * Created by warren on 4/24/17.
 */
import {Actions} from 'react-native-router-flux'
import ccActions from '../actions/creditCardActions'
import getCreditCards from '../../api/getCreditCards'

export default checkoutThunk = () => (dispatch, getState) => {
  const customerId = getState().auth.clientId;
  return getCreditCards(customerId)
    .then(res => {
      return Promise.all(res.Items.map(item => Promise.resolve(dispatch(ccActions.token.add(item.CardId.S, item.Last4.S, item.Brand.S, item.ExpMonth.N, item.ExpYear.N)))))
    })
    .then(() => Actions.checkout())
    .catch(err => console.log(err))
};