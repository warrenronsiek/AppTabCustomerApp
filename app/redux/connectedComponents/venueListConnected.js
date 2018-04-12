import {connect} from 'react-redux';
import venueList from '../components/venueList';
import {setActiveVenueThunk} from '../middleware/venueThunk'
import {Actions} from 'react-native-router-flux'

const mapStateToProps = state => ({
  venues: state.venues
});

const mapDispatchToProps = dispatch => ({
  selectVenue: ({venueId, venueName, address}) => dispatch(setActiveVenueThunk({venueId, venueName, address})),
  navToPolicy: () => Actions.privacy()
});

export default connect(mapStateToProps, mapDispatchToProps)(venueList)