export const UPDATE_VENUE = 'UPDATE_VENUE';
export const updateVenue = ({venueId, address, venueName}) => {
  return {type: UPDATE_VENUE, payload: {venueId, address, venueName}}
};

export const UPDATE_ACTIVE_VENUE = 'UPDATE_ACTIVE_VENUE';
export const updateActiveVenue = ({venueId, address, venueName}) => {
  return {type: UPDATE_ACTIVE_VENUE, payload: {venueId, address, venueName}}
};

export const SET_BLUETOOTH_RECONSTRUCTION = 'SET_BLUETOOTH_RECONSTRUCTION';
export const setBluetoothReconstruction = (bool) => {
  return {type: SET_BLUETOOTH_RECONSTRUCTION, bool}
};

