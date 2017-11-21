import deleteCard from '../../api/deleteCreditCard'
import ccActions from '../actions/creditCardActions'

const deleteCardThunk = ccToken => (dispatch, getState) => {
  const state = getState(),
    customerId = state.auth.customerId;
  deleteCard({cardId: ccToken, customerId});
  dispatch(ccActions.token.delete(ccToken));
};

export default deleteCardThunk