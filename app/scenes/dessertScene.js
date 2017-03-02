/**
 * Created by warren on 2/27/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import menuComponentWillMount from '../common/menuComponentWillMount';
import MenuListBlueprint from '../redux/connectedComponents/menuListBlueprintConnected';

const DessertList = MenuListBlueprint('dessert');

class DessertScene extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  };

  componentWillMount() {
    menuComponentWillMount(this)
  }

  render() {
    return (
      <DessertList/>
    )
  }
};

export default connect()(DessertScene)