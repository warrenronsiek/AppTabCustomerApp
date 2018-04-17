/**
 * Created by warren on 1/23/17.
 */

export const UPDATE_BEACON_BLE = 'UPDATE_BEACON_BLE';
export const updateBeaconBle = (distance, namespace, instance, lastSeen) => {
    return {type: UPDATE_BEACON_BLE, distance, namespace, instance, lastSeen, beaconId: instance}
};

export const UPDATE_BEACON_API = 'UPDATE_BEACON_API';
export const updateBeaconApi = (beaconId, nodeName, nodeDescription, venueId) => {
    return {type: UPDATE_BEACON_API, beaconId, nodeName, nodeDescription, venueId}
};

export const SET_ACTIVE_BEACON = 'SET_ACTIVE_BEACON';
export const setActiveBeacon = (beaconId, venueId) => {
    return {type: SET_ACTIVE_BEACON, beaconId, venueId}
};

export const SET_BEACON_QUERIED = 'SET_BEACON_QUERIED';
export const setBeaconQueried = (beaconId) => {
  return {type: SET_BEACON_QUERIED, beaconId}
};

