import store from './app/redux/store'
import passwordResetOnBack from './app/common/passwordResetOnBack'
import React, {Component} from 'react'
import {Provider, connect} from 'react-redux'
import {Router, Scene, Actions} from 'react-native-router-flux'
import DrawerComponent from './app/redux/connectedComponents/drawerListConnected'
import CartIcon from './app/redux/connectedComponents/cartIconWithAlertConnected'
import OrderIcon from './app/redux/connectedComponents/orderIconWithAlertConnected'
import Login from './app/scenes/loginScene'
import Placeholder from './app/scenes/placeholder'
import OptionsSelectionModal from './app/scenes/optionsSelectionModal'
import Register from './app/scenes/registerScene'
import Nodes from './app/scenes/nodeScene'
import Request from './app/scenes/ordersScene'
import MenuScene from './app/scenes/menuScene'
import CheckoutScene from './app/scenes/checkoutScene'
import CardFormScene from './app/scenes/creditCardFormScene'
import ConfirmCodeScene from './app/scenes/confirmationCodeEntryScene'
import CartScene from './app/scenes/cartScene'
import ResetPasswordScene from './app/scenes/passwordResetScene'
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import transactionActions from './app/redux/actions/trasactionActions'
import Venues from './app/scenes/venueScene'
import Menu from './app/assets/svgs/menu'

const RouterWithRedux = connect()(Router);

const drink = ({selected}) => <Menu width={35} height={35}/>;
const options = ({selected}) => <SimpleIcons name="options" size={30} color={selected ? '#6495ED' : 'black'}/>;
const bell = ({selected}) => <OrderIcon/>;
const cart = ({selected}) => <CartIcon/>;

class AppTabCustomerApp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key='venue' component={Venues} title='Venues'/>
            <Scene key="login" component={Login} title="Login"/>
            <Scene key="register" component={Register} title="Register"/>
            <Scene key="passwordreset" component={ResetPasswordScene} title="Reset Password"
                   back onBack={() => passwordResetOnBack()}/>
            <Scene key="code" component={ConfirmCodeScene} title="Confirm Code"/>
            <Scene key="nodes" component={Nodes} title="Table Selection" back/>
            <Scene key="tabs" tabs={true} hideNavBar tabBarIconContainerStyle={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
              <Scene key="orders" component={Request} title="Your Orders" icon={bell}
                     back onBack={() => Actions.nodes()} onEnter={() => store.dispatch(transactionActions.alert.clear())}/>
              <Scene key="menu" component={MenuScene} title="Menu" icon={drink} initial={true}
                     back onBack={() => Actions.nodes()}/>
              <Scene key="cart" component={CartScene} title="Cart" icon={cart}
                     back onBack={() => Actions.nodes()}/>
              <Scene key="options" component={DrawerComponent} title="Options" icon={options}
                     back onBack={() => Actions.nodes()}/>
            </Scene>
            <Scene key="optionsModal" component={OptionsSelectionModal} title="Options" back modal/>
            <Scene key="placeholder" component={Placeholder} title="Placeholder" back/>
            <Scene key="checkout" component={CheckoutScene} title="Checkout" back/>
            <Scene key="cardForm" component={CardFormScene} title="Card Details" back/>
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
};

export default AppTabCustomerApp