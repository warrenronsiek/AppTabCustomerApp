import BeaconTypeError from "../errors/beaconTypeError";
import * as _ from "lodash";
import {Platform} from "react-native";
import {Buffer} from 'buffer';

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

function parseBlePacket(item) {
  return new Promise((resolve, reject) => {
      if (item.advertisement.localName === 'Kontakt') {
        const data = parseIntObject(_.filter(item.advertisement.serviceData, {uuid: (Platform.OS === 'ios') ? 'feaa' : '0000feaa00001000800000805f9b34fb'})[0].data);
        const distance = Math.pow(10, ((data.txPower - item.rssi) - 41) / 20.0);
        const lastSeen = Math.floor(Date.now() / 1000);
        resolve({instance: data.instance, namespace: data.namespace, distance, lastSeen})
      } else {
        reject(new BeaconTypeError('NotKontaktBeacon'))
      }
    }
  );
}

export {parseBlePacket}