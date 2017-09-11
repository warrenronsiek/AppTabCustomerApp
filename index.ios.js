import store from './app/redux/store'
import passwordResetOnBack from './app/common/passwordResetOnBack'
import React, {Component} from 'react'
import {AppRegistry} from 'react-native'
import {Provider, connect} from 'react-redux'
import {Router, Scene, Actions, ActionConst} from 'react-native-router-flux'
import DrawerComponent from './app/redux/connectedComponents/drawerListConnected'
import Login from './app/scenes/loginSceneIOS'
import Placeholder from './app/scenes/placeholder'
import OptionsSelectionModal from './app/scenes/optionsSelectionModal'
import Register from './app/scenes/registerScene'
import Nodes from './app/scenes/nodeScene'
import Request from './app/scenes/ordersScene'
import DrinkScene from './app/scenes/drinkScene'
import AlcoholScene from './app/scenes/alcoholScene'
import MainCourseScene from './app/scenes/mainCourseScene'
import AppetizerScene from './app/scenes/appetizerScene'
import CheckoutScene from './app/scenes/checkoutScene'
import DessertScene from './app/scenes/dessertScene'
import CardFormScene from './app/scenes/creditCardFormScene'
import ConfirmCodeScene from './app/scenes/confirmationCodeEntryScene'
import CartScene from './app/scenes/cartScene'
import ResetPasswordScene from './app/scenes/passwordResetScene'
import EntypoIcons from 'react-native-vector-icons/Entypo'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const RouterWithRedux = connect()(Router);

const cocktail = ({selected}) => <EntypoIcons name="drink" size={27} color={selected ? '#6495ED' : 'black'}/>;
const drink = ({selected}) => <MaterialIcons name="local-drink" size={31} color={selected ? '#6495ED' : 'black'}/>;
const main = ({selected}) => <MaterialIcons name="local-dining" size={33} color={selected ? '#6495ED' : 'black'}/>;
const dessert = ({selected}) => <Ionicon name="ios-ice-cream" size={32} color={selected ? '#6495ED' : 'black'}/>;
const bell = ({selected}) => <Ionicon name="ios-notifications" size={36} color={selected ? '#6495ED' : 'black'}/>;
const carrot = ({selected}) => <Ionicon name="ios-nutrition" size={36} color={selected ? '#6495ED' : 'black'}/>;

export default class AppTabCustomerApp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="login" component={Login} title="Login"/>
            <Scene key="register" component={Register} title="Register"/>
            <Scene key="passwordreset" component={ResetPasswordScene} title="Reset Password"
                   back onBack={() => passwordResetOnBack()}/>
            <Scene key="code" component={ConfirmCodeScene} title="Confirm Code"/>
            <Scene key="drawer" drawer drawerPosition="right" contentComponent={DrawerComponent} hideNavBar>
              <Scene key="drawerRoot">
                <Scene key="nodes" component={Nodes} title="Table Selection" back/>
                <Scene key="tabs" tabs={true} hideNavBar>
                  <Scene key="orders" component={Request} title="Your Orders" icon={bell} initial={true}
                         back onBack={() => Actions.nodes()}/>
                  <Scene key="drinks" component={DrinkScene} title="Drinks" icon={drink}
                         back onBack={() => Actions.nodes()}/>
                  <Scene key="main" component={MainCourseScene} title="Main Course" icon={main}
                         back onBack={() => Actions.nodes()}/>
                  <Scene key="alcohol" component={AlcoholScene} title="Alcohol" icon={cocktail}
                         back onBack={() => Actions.nodes()}/>
                  <Scene key="dessert" component={DessertScene} title="Dessert" icon={dessert}
                         back onBack={() => Actions.nodes()}/>
                  <Scene key="appetizer" component={AppetizerScene} title="Appetizer" icon={carrot}
                         back onBack={() => Actions.nodes()}/>
                </Scene>
                <Scene key="optionsModal" component={OptionsSelectionModal} title="Options" back modal/>
                <Scene key="placeholder" component={Placeholder} title="Placeholder" back/>
                <Scene key="cart" component={CartScene} title="Cart" back/>
                <Scene key="checkout" component={CheckoutScene} title="Checkout" back/>
                <Scene key="cardForm" component={CardFormScene} title="Card Details" back/>
              </Scene>
            </Scene>
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('AppTabCustomerApp', () => AppTabCustomerApp);
