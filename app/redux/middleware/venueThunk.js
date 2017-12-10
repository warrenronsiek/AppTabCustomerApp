import {updateActiveVenue} from "../actions/venueActions";
import {Actions} from 'react-native-router-flux'
import {writeToFirehose} from "../../api/firehose";

const setActiveVenueThunk = ({venueId, address, venueName}) => (dispatch) => {
  dispatch(updateActiveVenue({venueId, address, venueName}));
  Actions.nodes();
  writeToFirehose('VenueSelected');
};

export {setActiveVenueThunk}