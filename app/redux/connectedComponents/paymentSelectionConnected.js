/**
 * Created by warren on 4/2/17.
 */
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import paymentSelection from '../components/paymentSelection'
import payThunk from '../middleware/payThunk'
import {sortBy} from 'lodash'
import selectCard from '../middleware/selectCardThunk'
import ccActions from '../actions/creditCardActions'
import {ccTokens} from "../reducers/creditCardReducer";

const mapStateToProps = (state) => ({
  paymentListItems: sortBy(state.ccTokens, ['expYear', 'expMonth', 'brand', 'last4']),
  paymentStatus: state.paymentStatus
});

const mapDispatchToProps = (dispatch) => ({
  selectCard: ccToken => dispatch(selectCard(ccToken)),
  addCard: () => Actions.cardForm(),
  pay: () => dispatch(payThunk()),
  showDeleteButton: (ccToken) => dispatch(ccActions.token.toggleDeleteButton({ccToken, bool: true})),
  hideDeleteButton: (ccToken) => dispatch(ccActions.token.toggleDeleteButton({ccToken, bool: false})),
  deleteCard: ccToken => dispatch(ccActions.token.delete(ccToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(paymentSelection)