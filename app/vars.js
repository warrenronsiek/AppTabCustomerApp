/**
 * Created by warren on 5/25/17.
 */

let url, stripePublicKey, firehoseName, identityPoolId, identityPoolName;
if (__DEV__) {
  url = 'https://ouxlbdc3ja.execute-api.us-west-2.amazonaws.com/dev';
  stripePublicKey = 'pk_test_UHQyJcNcx8C65lXY8h9xZwSN';
  firehoseName = 'dev-apptab-data-stream';
  identityPoolId = 'us-west-2:03e3c8df-0ef1-4b83-a0e2-a4fc652a2815';
  identityPoolName = 'cognito-idp.us-west-2.amazonaws.com/us-west-2_hAAdk6UCT';
} else {
  url = 'https://ouxlbdc3ja.execute-api.us-west-2.amazonaws.com/dev';
  stripePublicKey = 'pk_test_UHQyJcNcx8C65lXY8h9xZwSN';
  firehoseName = 'dev-apptab-data-stream';
  identityPoolId = 'us-west-2:03e3c8df-0ef1-4b83-a0e2-a4fc652a2815';
  identityPoolName = 'cognito-idp.us-west-2.amazonaws.com/us-west-2_hAAdk6UCT';
  // url = 'https://3qqlpbfcv1.execute-api.us-west-2.amazonaws.com/prod';
  // stripePublicKey = 'pk_live_FHmywJaXessS64PZR8tK5oOG';
  // firehoseName = 'prod-apptab-data-stream';
  // identityPoolId = 'us-west-2:2894af0f-10cd-4d69-8d3a-312ad988c289';
  // identityPoolName = 'cognito-idp.us-west-2.amazonaws.com/us-west-2_etDUUXPIB';
}

export {url, stripePublicKey, firehoseName, identityPoolId, identityPoolName}