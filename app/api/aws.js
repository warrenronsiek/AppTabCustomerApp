import store from '../redux/store'
import AWS from 'aws-sdk/dist/aws-sdk-react-native'
import {identityPoolId, firehoseName, identityPoolName} from "../vars"
import {omit, get} from 'lodash'
import uuid from 'react-native-uuid'

let firehose, s3, lambda;
AWS.config.update({
  region: 'us-west-2',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId,
  })
});
AWS.config.credentials.get(() => {
  firehose = new AWS.Firehose();
  s3 = new AWS.S3();
  lambda = new AWS.Lambda();
});

const updateCredentials = () => {
  const auth = store.getState().auth;
  return new Promise((resolve, reject) => {
      AWS.config.update({
        region: 'us-west-2',
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: identityPoolId,
          Logins: {
            [identityPoolName]: auth.idToken
          }
        })
      });
    AWS.config.credentials.get(() => {
      firehose = new AWS.Firehose();
      s3 = new AWS.S3();
      lambda = new AWS.Lambda();
      resolve('credentials updated')
    });
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

export {writeToFirehose, updateCredentials, s3, lambda}