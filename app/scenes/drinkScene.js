/**
 * Created by warren on 2/27/17.
 */
import React, {Component} from 'react';
import DrinkList from '../redux/connectedComponents/drinkListConnected';
import menuComponentWillMount from '../common/menuComponentWillMount';
import {connect} from 'react-redux';

class DrinkScene extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  };

  componentWillMount() {
    menuComponentWillMount(this)
  }

  render() {
    return (
      <DrinkList/>
    )
  }
};

export default connect()(DrinkScene)