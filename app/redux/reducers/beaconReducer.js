/**
 * Created by warren on 1/23/17.
 */
import {UPDATE_BEACON_API, UPDATE_BEACON_BLE, SET_ACTIVE_BEACON, SET_BEACON_QUERIED} from '../actions/beaconActions'
import * as _ from 'lodash'
import {devData} from "../../common/devData";

export const beacons = (state = {
  beaconList: __DEV__ ? devData.beaconList : [],
  showBeacons: __DEV__, activeVenueId: __DEV__ ? devData.activeVenueId : ''
}, action) => {
  let updatedBeacon, oldBeacon, filteredState;
  switch (action.type) {
    case UPDATE_BEACON_BLE:
      oldBeacon = _.find(state.beaconList, ['beaconId', action.beaconId]);
      filteredState = state.beaconList.filter((beacon) => beacon.beaconId !== action.beaconId);
      if (oldBeacon) {
        updatedBeacon = {
          ...oldBeacon,
          beaconId: action.beaconId,
          distance: action.distance,
          instance: action.instance,
          lastSeen: action.lastSeen,
          updatedCount: oldBeacon.updatedCount + 1
        };
        return {...state, beaconList: [...filteredState, updatedBeacon]}
      } else {
        return {
          ...state, beaconList: [...filteredState, {
            beaconId: action.beaconId,
            distance: action.distance,
            instance: action.instance,
            lastSeen: action.lastSeen,
            updatedCount: 1
          }]
        }
      }
    case UPDATE_BEACON_API:
      oldBeacon = _.find(state.beaconList, ['beaconId', action.beaconId]);
      filteredState = state.beaconList.filter((beacon) => beacon.beaconId !== action.beaconId);
      let newBeaconList;
      if (oldBeacon) {
        newBeaconList = [...filteredState, {
          beaconId: action.beaconId,
          beaconName: action.beaconName,
          beaconDescription: action.beaconDescription,
          venueId: action.venueId,
          apiQueried: true
        }]
      } else {
        updatedBeacon = {
          ...oldBeacon,
          beaconId: action.beaconId,
          beaconName: action.beaconName,
          beaconDescription: action.beaconDescription,
          venueId: action.venueId,
          apiQueried: true
        };
        newBeaconList = [...filteredState, updatedBeacon]
      }
      return {
        ...state, beaconList: newBeaconList
      };
    case SET_BEACON_QUERIED:
      oldBeacon = _.find(state.beaconList, ['beaconId', action.beaconId]);
      filteredState = state.beaconList.filter((beacon) => beacon.beaconId !== action.beaconId);
      if (oldBeacon) {
        return {
          ...state,
          beaconList: [...filteredState, {
            ...oldBeacon,
            beaconId: action.beaconId,
            apiQueried: true
          }]
        }
      } else {
        updatedBeacon = {
          beaconId: action.beaconId,
          apiQueried: true
        };
        return {...state, beaconList: [...filteredState, updatedBeacon]}
      }
    default:
      return state
  }
};

export const activeBeacon = (state = {beaconId: ""}, action) => {
  switch (action.type) {
    case SET_ACTIVE_BEACON:
      return {
        beaconId: action.beaconId,
        venueId: action.venueId
      };
    default:
      return state
  }
};