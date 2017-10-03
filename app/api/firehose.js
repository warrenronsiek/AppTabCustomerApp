import store from '../redux/store'
import AWS from 'aws-sdk/dist/aws-sdk-react-native'
import {identityPoolId, firehoseName, identityPoolName} from "../vars"
import {omit, get} from 'lodash'
import uuid from 'react-native-uuid'

let firehose;
AWS.config.region = 'us-west-2';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: identityPoolId,
  region: 'us-west-2',
});
firehose = new AWS.Firehose();

const updateCredentials = () => {
  const auth = store.getState().auth;
  AWS.config.credentials.Logins = {
    [identityPoolName]: auth.idToken
  };
  AWS.config.credentials.expired = true;
  AWS.config.credentials.get(() => {
    firehose = new AWS.Firehose();
  });
};

const writeToFirehose = type => {
  const state = store.getState();
  return firehose.putRecord({
    DeliveryStreamName: firehoseName,
    Record: {
      Data: JSON.stringify({
        state: omit(state, ['creditCard', 'loginParams', 'registerParams', 'auth', 'passwordResetData', 'deviceToken', 'activeNode.sessionId']),
        customerId: get(state, 'auth.customerId', 'null'),
        deviceToken: get(state, 'deviceToken', 'null'),
        date: Date.now(),
        sessionId: get(state, 'activeNode.sessionId', 'null'),
        eventId: uuid.v1(),
        type
      })
    }
  }).promise();
};

export {writeToFirehose, updateCredentials}