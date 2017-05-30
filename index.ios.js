import store from './app/redux/store'
import React, {Component} from 'react'
import {AppRegistry, Text} from 'react-native'
import {Provider, connect} from 'react-redux'
import {Router, Scene, Actions, ActionConst} from 'react-native-router-flux'
import Login from './app/scenes/loginScene'
import Placeholder from './app/scenes/placeholder'
import Register from './app/scenes/registerScene'
import Nodes from './app/scenes/nodeScene'
import Request from './app/scenes/serviceRequestScene'
import DrinkScene from './app/scenes/drinkScene'
import AlcoholScene from './app/scenes/alcoholScene'
import MainCourseScene from './app/scenes/mainCourseScene'
import AppetizerScene from './app/scenes/appetizerScene'
import CheckoutScene from './app/scenes/checkoutScene'
import DessertScene from './app/scenes/dessertScene'
import CardFormScene from './app/scenes/creditCardFormScene'
import CartScene from './app/scenes/cartScene'
import EntypoIcons from 'react-native-vector-icons/Entypo'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const RouterWithRedux = connect()(Router);

const textIcon = ({title, selected}) => <Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>;
const cocktail = ({selected}) => <EntypoIcons name="drink" size={31} color={selected ? '#6495ED' : 'black'}/>;
const drink = ({selected}) => <MaterialIcons name="local-drink" size={35} color={selected ? '#6495ED' : 'black'}/>;
const main = ({selected}) => <MaterialIcons name="local-dining" size={37} color={selected ? '#6495ED' : 'black'}/>;
const dessert = ({selected}) => <Ionicon name="ios-ice-cream" size={36} color={selected ? '#6495ED' : 'black'}/>;
const bell = ({selected}) => <Ionicon name="ios-notifications" size={40} color={selected ? '#6495ED' : 'black'}/>;
const carrot = ({selected}) => <Ionicon name="ios-nutrition" size={40} color={selected ? '#6495ED' : 'black'}/>;


export default class AppTabCustomerApp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="login" component={Login} title="Login"/>
          <Scene key="register" component={Register} title="Register"/>
          <Scene key="nodes" component={Nodes} title="Table Selection" type={ActionConst.RESET}/>
          <Scene key="tabs" tabs={true} type={ActionConst.RESET}>
            <Scene key="request" component={Request} title="Service Request" icon={bell} initial={true}
                   onBack={() => Actions.nodes(ActionConst.REFRESH)}/>
            <Scene key="drinks" component={DrinkScene} title="Drinks" icon={drink}
                   onBack={() => Actions.nodes(ActionConst.REFRESH)}/>
            <Scene key="main" component={MainCourseScene} title="Main Course" icon={main}
                   onBack={() => Actions.nodes(ActionConst.REFRESH)}/>
            <Scene key="alcohol" component={AlcoholScene} title="Alcohol" icon={cocktail}
                   onBack={() => Actions.nodes(ActionConst.REFRESH)}/>
            <Scene key="dessert" component={DessertScene} title="Dessert" icon={dessert}
                   onBack={() => Actions.nodes(ActionConst.REFRESH)}/>
            <Scene key="appetizer" component={AppetizerScene} title="Appetizer" icon={carrot}
                   onBack={() => Actions.nodes(ActionConst.REFRESH)}/>
          </Scene>
          <Scene key="placeholder" component={Placeholder} title="Placeholder"/>
          <Scene key="cart" component={CartScene} title="Cart"/>
          <Scene key="checkout" component={CheckoutScene} title="Checkout"/>
          <Scene key="cardForm" component={CardFormScene} title="Card Details"/>
        </RouterWithRedux>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('AppTabCustomerApp', () => AppTabCustomerApp);
