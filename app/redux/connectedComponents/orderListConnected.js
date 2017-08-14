import {connect} from 'react-redux'
import orderList from '../components/orderList'

const mapStateToProps = state => ({
  orders: state.transactions
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(orderList)