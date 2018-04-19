import {parseBlePacket} from "./bleUtils";
import {setBeaconQueried, updateBeaconBle} from "../redux/actions/beaconActions";
import logger from "../api/loggingApi";
import getVenue from '../api/getVenue'
import GetNodeQueriedError from "../errors/getNodeQueriedError";
import WrongNamespaceError from "../errors/wrongNamespaceError";
import * as _ from "lodash";
import getBeaconInfo from '../api/getBeaconInfo'
import {updateNode} from '../redux/actions/nodeActions'
import store from '../redux/store'
import {updateVenue} from "../redux/actions/venueActions";
import {BleManager} from 'react-native-ble-plx'
import NoVenuesError from '../errors/noVenuesError'
const bleManager = new BleManager();

const componentDidMount = () => {
  bleManager.state().then(res => {
    if (res === 'Unauthorized') {
      alert('Your phone\'s bluetooth is turned off.\nThe app won\'t be able to detect your restaurant until it is turned on.');
    } else if (res === 'PoweredOn') {
      bleManager.startDeviceScan(null, null, onFound);
    }
  });
};

const stopScanning = () => {
  bleManager.stopDeviceScan()
};

const onFound = (err, item) => {
  parseBlePacket(item)
    .then(res => {
      if (res.namespace === 'bc635921402893714ad5') {
        return Promise.resolve(store.dispatch(updateBeaconBle(res.distance, res.namespace, res.instance, res.lastSeen)))
      }
      else {
        throw new WrongNamespaceError('node has incorrect namespace')
      }
    })
    .then(res => {
      const beaconState = _.find(store.getState().beacons.beaconList, {beaconId: res.beaconId});
      if (beaconState.apiQueried === undefined) {
        store.dispatch(setBeaconQueried(res.beaconId));
        return getBeaconInfo({beaconId: res.beaconId})
      } else {
        throw new GetNodeQueriedError('GetNode api already queried for this node')
      }
    })
    .then(res => {
      let getVenues;
      if (res.Items.length > 0) {
        getVenues = res.Items
          .map(item => item.VenueId.S)
          .map(venueId => getVenue({venueId}));
      } else {
        throw new NoVenuesError()
      }
      res.Items.forEach(item => {
        store.dispatch(updateNode({
          nodeId: item.NodeId.S,
          nodeName: item.NodeName.S,
          venueId: item.VenueId.S,
          beaconId: item.BeaconId.S
        }))
      });
      return Promise.all(getVenues)
    })
    .then(res => {
      res.forEach(item => {
        store.dispatch(updateVenue({
          venueId: item.venue.Item.VenueId.S,
          venueName: item.venue.Item.Name.S,
          address: item.venue.Item.Address.S
        }));
      });
      return Promise.resolve()
    })
    .catch(err => {
      switch (err.name) {
        case 'NoVenuesError':
          break;
        case 'TypeError':
          break;
        case 'BeaconTypeError':
          break;
        case 'GetNodeQueriedError':
          break;
        case 'WrongNamespaceError':
          break;
        default:
          console.log(err);
          logger('error processing node', err);
          break;
      }
    });
};

export {componentDidMount, stopScanning}
