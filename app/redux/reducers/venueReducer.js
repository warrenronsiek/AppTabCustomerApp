import {UPDATE_ACTIVE_VENUE, UPDATE_VENUE} from '../actions/venueActions'

const venues = (state = [{venueId: 'a', venueName: "Stu's Stew Store", address: '1234 Market Street'},{venueId: 'b', venueName: "Bob's Burgers", address: '1234 Main Street'}], action) => {
  switch (action.type) {
    case UPDATE_VENUE:
      return [...state.filter(venue => venue.venueId !== action.payload.venueId), {...action.payload}].sort((a, b) => a > b);
    default:
      return state
  }
};

const activeVenue = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ACTIVE_VENUE:
      return {...action.payload};
    default:
      return state
  }
};

export {venues, activeVenue}