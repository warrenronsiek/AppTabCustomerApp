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
    selectCard: () => {}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(paymentSelection)