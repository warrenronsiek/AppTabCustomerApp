import {UPDATE_ACTIVE_VENUE, UPDATE_VENUE} from '../actions/venueActions'

const venues = (state = __DEV__ ? [{venueId: '5913c829b6739ed3b963', address: '1234 Market Street', venueName: 'Stu\'s Stews'}] : [], action) => {
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