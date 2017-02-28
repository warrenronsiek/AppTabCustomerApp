/**
 * Created by warren on 2/27/17.
 */
import React, {Component} from 'react';
import MainList from '../redux/connectedComponents/mainCourseListConnected';
import {connect} from 'react-redux';
import menuComponentWillMount from '../common/menuComponentWillMount';

class MainScene extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  };

  componentWillMount() {
    menuComponentWillMount(this)
  }

  render() {
    return (
      <MainList/>
    )
  }
};

export default connect()(MainScene)