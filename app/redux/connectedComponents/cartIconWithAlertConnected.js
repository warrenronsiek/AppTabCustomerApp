import {connect} from 'react-redux'
import CartIconWithAlert from '../components/cartIconWithAlert'

const CartIcon = ({selected}) => {
  const mapStateToProps = (state) => ({
    selected: selected,
    count: state.numberOfCartItems
  });

  return connect(mapStateToProps)(CartIconWithAlert)
};


export default CartIcon