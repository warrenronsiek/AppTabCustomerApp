/**
 * Created by warren on 4/2/17.
 */
import {connect} from 'react-redux';
import ccActions from '../actions/creditCardActions';
import paymentSelection from '../components/paymentSelection';

const mapStateToProps = (state) => {
  return {
    paymentListItems: state.ccTokens
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectCard: (ccToken) => dispatch(ccActions.token.setSelected(ccToken)),
    addCard: () => {}, //TODO
    pay: () => {} //TODO
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(paymentSelection)