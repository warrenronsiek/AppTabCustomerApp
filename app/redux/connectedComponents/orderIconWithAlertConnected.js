import {connect} from 'react-redux'
import OrderIconWithAlert from '../components/orderIconWithAlert'

const mapStateToProps = (state) => ({
  count: state.transactionCount
});

export default connect(mapStateToProps)(OrderIconWithAlert);