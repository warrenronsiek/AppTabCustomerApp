import {updateActiveVenue} from "../actions/venueActions";
import {Actions} from 'react-native-router-flux'

const setActiveVenueThunk = ({venueId, address, venueName}) => (dispatch) => {
  dispatch(updateActiveVenue({venueId, address, venueName}));
  Actions.nodes()
};

export {setActiveVenueThunk}