import VenueList from '../redux/connectedComponents/venueListConnected'
import React, {Component} from "react";
import {componentDidMount, componentWillMount} from "../common/bleScannerComponentFunctions";

export default class VenueScene extends Component {
  componentWillMount() {
    componentWillMount()
  }

  componentDidMount() {
    componentDidMount()
  }

  render() {
    return (
      <VenueList/>
    )
  }
}