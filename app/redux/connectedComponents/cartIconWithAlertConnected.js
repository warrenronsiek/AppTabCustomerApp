import {connect} from 'react-redux'
import CartIconWithAlert from '../components/cartIconWithAlert'

const mapStateToProps = (state) => ({
  count: state.numberOfCartItems
});

export default connect(mapStateToProps)(CartIconWithAlert);