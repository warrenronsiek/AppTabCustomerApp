/**
 * Created by warren on 4/2/17.
 */
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import paymentSelection from '../components/paymentSelection'
import payThunk from '../middleware/payThunk'
import selectCard from '../middleware/selectCardThunk'
import ccActions from '../actions/creditCardActions'
import deleteCardThunk from '../middleware/deleteCardThunk'

const mapStateToProps = (state) => ({
  paymentListItems: state.ccTokens,
  paymentStatus: state.paymentStatus
});

const mapDispatchToProps = (dispatch) => ({
  selectCard: ccToken => dispatch(selectCard(ccToken)),
  addCard: () => Actions.cardForm(),
  pay: () => dispatch(payThunk()),
  showDeleteButton: (ccToken) => dispatch(ccActions.token.toggleDeleteButton({ccToken, bool: true})),
  hideDeleteButton: (ccToken) => dispatch(ccActions.token.toggleDeleteButton({ccToken, bool: false})),
  deleteCard: ccToken => dispatch(deleteCardThunk(ccToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(paymentSelection)