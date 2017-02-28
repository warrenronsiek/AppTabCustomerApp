/**
 * Created by warren on 2/27/17.
 */
import React, {Component} from 'react';
import DessertList from '../redux/connectedComponents/dessertListConnected';
import {connect} from 'react-redux';
import menuComponentWillMount from '../common/menuComponentWillMount';

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