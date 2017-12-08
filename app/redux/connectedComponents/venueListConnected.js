import {connect} from 'react-redux';
import {updateActiveVenue} from '../actions/venueActions';
import venueList from '../components/venueList';

const mapStateToProps = state => ({
  venues: state.venues
});

const mapDispatchToProps = dispatch => ({
  selectVenue: ({venueId, venueName, address}) => dispatch(updateActiveVenue({venueId, venueName, address}))
});

export default connect(mapStateToProps, mapDispatchToProps)(venueList)