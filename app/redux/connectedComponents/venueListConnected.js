import {connect} from 'react-redux';
import venueList from '../components/venueList';
import {setActiveVenueThunk} from '../middleware/venueThunk'

const mapStateToProps = state => ({
  venues: state.venues
});

const mapDispatchToProps = dispatch => ({
  selectVenue: ({venueId, venueName, address}) => dispatch(setActiveVenueThunk({venueId, venueName, address}))
});

export default connect(mapStateToProps, mapDispatchToProps)(venueList)