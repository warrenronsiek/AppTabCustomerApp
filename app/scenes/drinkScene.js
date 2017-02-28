/**
 * Created by warren on 2/27/17.
 */
import React, {Component} from 'react';
import DrinkList from '../redux/connectedComponents/drinkListConnected';
import getMenu from '../api/getMenu';
import {updateMenuItem} from '../redux/actions/menuActions';
import {connect} from 'react-redux';

class DrinkScene extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  };

  componentWillMount() {
    const state = this.context.store.getState();
    console.log(state.nodes.filter(node => node.nodeId === state.activeNode)[0]);
    const venueId = state.nodes.filter(node => node.nodeId === state.activeNode)[0].venueId;
    getMenu(venueId)
      .then(res => res.Items.forEach(item => this.props.dispatch(updateMenuItem(item.ItemName.S, item.ItemDescription.S, item.Price.N,
        item.Tags.SS, item.Category.S, item.ItemId.S, item.VenueId.S))))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <DrinkList/>
    )
  }
};

export default connect()(DrinkScene)