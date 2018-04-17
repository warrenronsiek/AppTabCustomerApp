/**
 * Created by warren on 1/23/17.
 */
import {UPDATE_BEACON_API, UPDATE_BEACON_BLE, SET_ACTIVE_BEACON, SET_BEACON_QUERIED} from '../actions/beaconActions'
import {UPDATE_ACTIVE_VENUE} from "../actions/venueActions";
import uuid from 'react-native-uuid'
import * as _ from 'lodash'
import chunk from 'lodash/fp/chunk'
import sortBy from 'lodash/fp/sortBy'
import filter from 'lodash/fp/filter'
import map from 'lodash/fp/map'
import pick from 'lodash/fp/pick'
import flow from 'lodash/fp/flow'
import {devData} from "../../common/devData";

export const beacons = (state = {
  beaconList: __DEV__ ? devData.beaconList : [],
  viewableBeacons: __DEV__ ? devData.viewableBeacons : [],
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
      let viewableBeacons = flow(
        filter(beacon => !!beacon.venueId),
        map(beacon => _.pick(beacon, ['venueId', 'beaconId'])),
        filter(beacon => beacon.venueId === state.activeVenueId),
        sortBy(beacon => beacon.beaconId.slice(-3)),
        chunk(3),
        map(beaconChunk => ({data: beaconChunk, key: beaconChunk[0].beaconId}))
      )(newBeaconList);
      return {
        ...state, beaconList: newBeaconList,
        viewableBeacons: viewableBeacons,
        showBeacons: viewableBeacons.length > 0
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
        return {...state, beaconList: [...filteredState, updatedBeacon], viewableBeacons: []}
      }
    case UPDATE_ACTIVE_VENUE:
      let viewableBeacons2 = flow(
        filter(beacon => !!beacon.venueId),
        map(beacon => _.pick(beacon, ['venueId', 'beaconId'])),
        filter(beacon => beacon.venueId === action.payload.venueId),
        sortBy(beacon => beacon.beaconId.slice(-3)),
        chunk(3),
        map(beaconChunk => ({data: beaconChunk, key: beaconChunk[0].beaconId}))
      )(state.beaconList);
      return {
        ...state,
        activeVenueId: action.payload.venueId,
        viewableBeacons: viewableBeacons2,
        showBeacons: viewableBeacons2.length > 0
      };
    default:
      return state
  }
};

export const activeBeacon = (state = {beaconId: "", sessionId: ""}, action) => {
  switch (action.type) {
    case SET_ACTIVE_BEACON:
      return {
        beaconId: action.beaconId,
        sessionId: state.beaconId === action.beaconId ? state.sessionId : uuid.v4(),
        venueId: action.venueId
      };
    default:
      return state
  }
};