/**
 * Created by warren on 5/25/17.
 */

let url, stripePublicKey, firehoseName, identityPoolId, identityPoolName, apiKey, useDevData, imageBucket, loginPage;
if (__DEV__) {
  url = 'https://dahtdbe9u5.execute-api.us-west-2.amazonaws.com/dev';
  stripePublicKey = 'pk_test_UHQyJcNcx8C65lXY8h9xZwSN';
  firehoseName = 'dev-apptab-data-stream';
  identityPoolId = 'us-west-2:e68c2165-3d5b-4b58-9ba6-2aeaf7baea72';
  identityPoolName = 'cognito-idp.us-west-2.amazonaws.com/us-west-2_xtUwQOezW';
  apiKey = 'ma7vNxbdMd2V7pmUBh2hE9pxp9SMwYhZ3wBHnTQ4';
  imageBucket = 'dev-apptab-image-bucket';
  useDevData = false;
  loginPage = 'https://apptabdevuserpool.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=4lce6hkvpjhf17qqfivp6c5o8m&redirect_uri=apptab://login'
} else {
  url = 'https://3qqlpbfcv1.execute-api.us-west-2.amazonaws.com/prod';
  stripePublicKey = 'pk_live_FHmywJaXessS64PZR8tK5oOG';
  firehoseName = 'prod-apptab-data-stream';
  identityPoolId = 'us-west-2:2894af0f-10cd-4d69-8d3a-312ad988c289';
  identityPoolName = 'cognito-idp.us-west-2.amazonaws.com/us-west-2_etDUUXPIB';
  apiKey = 'VnExuBdEnGav2wK8Hgi1e9jOF4V4H0409CTWzctP';
  useDevData = false;
}

export {
  url,
  stripePublicKey,
  firehoseName,
  identityPoolId,
  identityPoolName,
  apiKey,
  useDevData,
  imageBucket,
  loginPage
}