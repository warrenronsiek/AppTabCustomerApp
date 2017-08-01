/**
 * Created by warren on 4/2/17.
 */
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import paymentSelection from '../components/paymentSelection'
import payThunk from '../middleware/payThunk'
import {sortBy} from 'lodash'
import selectCard from '../middleware/selectCardThunk'

const mapStateToProps = (state) => {
  return {
    paymentListItems: sortBy(state.ccTokens, ['expYear', 'expMonth', 'brand', 'last4']),
    paymentStatus: state.paymentStatus
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectCard: ccToken => dispatch(selectCard(ccToken)),
    addCard: () => Actions.cardForm(),
    pay: () => dispatch(payThunk())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(paymentSelection)