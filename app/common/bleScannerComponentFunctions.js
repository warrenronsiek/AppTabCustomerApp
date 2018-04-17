import {parseBlePacket} from "./bleUtils";
import {setBeaconQueried, updateBeaconApi, updateBeaconBle} from "../redux/actions/beaconActions";
import logger from "../api/loggingApi";
import getVenue from '../api/getVenue'
import GetNodeQueriedError from "../errors/getNodeQueriedError";
import WrongNamespaceError from "../errors/wrongNamespaceError";
import * as _ from "lodash";
import getBeaconInfo from '../api/getBeaconInfo'
import {updateNode} from '../redux/actions/nodeActions'
import store from '../redux/store'
import {updateVenue} from "../redux/actions/venueActions";
import {BleManager}  from 'react-native-ble-plx'
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
      console.log(res);
      let getVenues = res.Items.reduce((venueIdArray, item) => {
        if (venueIdArray.includes(item.VenueId.S)) {
          venueIdArray.push(item.VenueId.S)
        }
        return venueIdArray
      }).map(venueId => getVenue({venueId}));
      res.Items.forEach(item => {
        store.dispatch(updateNode({nodeId: item.NodeId.S, nodeName: item.NodeName.S, venueId: item.VenueId.S, beaconId: item.BeaconId.S}))
      });
      const node = res.nodeInfo.Item;
      const nodeId = node.NodeId.S, nodeName = node.NodeName.S, nodeDescription = node.NodeDescription.S,
        venueId = node.VenueId.S;
      store.dispatch(updateBeaconApi(nodeId, nodeName, nodeDescription, venueId));
      return Promise.all([getVenues])
    })
    .then(res => {
      console.log(res);
      store.dispatch(updateVenue({
        venueId: res.venue.Item.VenueId.S,
        venueName: res.venue.Item.Name.S,
        address: res.venue.Item.Address.S
      }));
      return Promise.resolve()
    })
    .catch(err => {
      switch (err.name) {
        case 'TypeError':
          break;
        case 'BeaconTypeError':
          break;
        case 'GetNodeQueriedError':
          break;
        case 'WrongNamespaceError':
          break;
        default:
          logger('error processing node', err);
          break;
      }
    });
};

export {componentDidMount, stopScanning}
