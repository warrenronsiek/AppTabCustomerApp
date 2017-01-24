/**
 * Created by warren on 1/23/17.
 */
import React, {Component} from 'react';
import Nodes from '../redux/connectedComponents/nodeListConnected';
import {updateNodeApi, updateNodeBle} from '../redux/actions/nodeActions';
import getNodeInfo from '../api/nodeApi';
import BeaconTypeError from '../errors/beaconTypeError';
import {connect} from 'react-redux';
import {Buffer} from 'buffer';
const noble = require('react-native-ble');

function parseIntObject(intObject) {
  const index = Math.max(...Object.keys(intObject).map(i => parseInt(i))) + 1;
  let arr = [];
  for (let i = 0; i < index; i++) {
    arr.push(intObject[i]);
  }
  const buff = Buffer.from(arr);
  const
    namespace = buff.slice(2, 12).toString('hex'),
    instance = buff.slice(12, 18).toString('hex'),
    txPower = buff.readInt8(1);
  return {namespace, instance, txPower}
}

/**TODO: Make this filter by Eddystone IDs */
function parseBlePacket(item) {
  if (item.advertisement.localName === 'Kontakt') {
    const data = parseIntObject(_.filter(item.advertisement.serviceData, {uuid: 'feaa'})[0].data);
    const distance = Math.pow(10, ((data.txPower - item.rssi) - 41) / 20.0);
    const lastSeen = Math.floor(Date.now() / 1000);
    return {instance: data.instance, namespace: data.namespace, distance, lastSeen}
  } else {
    throw new BeaconTypeError("Beacon is not manufactured by Kontakt")
  }
}

class NodeScene extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    noble.on('discover', this._onFound);
    noble.on('updated', this._onFound);
  }

  componentDidMount() {
    const waiter = function () {
      if (noble.state === 'poweredOn') {
        noble.startScanning([], true);
      } else {
        setTimeout(waiter, 100)
      }
    };
    waiter()
  }

  componentWillUnmount() {
    noble.stopScanning();
  }

  _onFound = (item) => {
    Promise.resolve(parseBlePacket(item))
      .then(res => {
        return Promise.resolve(this.props.dispatch(updateNodeBle(res.distance, res.namespace, res.instance, res.lastSeen)))
      })
      .catch(err => {
        switch (err) {
          case err instanceof TypeError:
            break;
          case err instanceof
        }
      });
  };

render()
{
  return (
    <Nodes/>
  )
}
}

export default connect()(NodeScene)