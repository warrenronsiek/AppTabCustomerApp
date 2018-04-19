/**
 * Created by warren on 5/25/17.
 */

let url, stripePublicKey, firehoseName, identityPoolId, identityPoolName, apiKey, useDevData, imageBucket, loginPage,
  userpoolUrl, userpoolClientId;
if (__DEV__) {
  url = 'https://dahtdbe9u5.execute-api.us-west-2.amazonaws.com/dev';
  stripePublicKey = 'pk_test_UHQyJcNcx8C65lXY8h9xZwSN';
  firehoseName = 'dev-apptab-data-stream';
  identityPoolId = 'us-west-2:e68c2165-3d5b-4b58-9ba6-2aeaf7baea72';
  identityPoolName = 'cognito-idp.us-west-2.amazonaws.com/us-west-2_xtUwQOezW';
  apiKey = 'ma7vNxbdMd2V7pmUBh2hE9pxp9SMwYhZ3wBHnTQ4';
  imageBucket = 'dev-apptab-image-bucket';
  useDevData = false;
  loginPage = 'https://apptabdevuserpool.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=4lce6hkvpjhf17qqfivp6c5o8m&redirect_uri=apptab://login';
  userpoolUrl = 'https://apptabdevuserpool.auth.us-west-2.amazoncognito.com';
  userpoolClientId = '4lce6hkvpjhf17qqfivp6c5o8m';
} else {
  // url = 'https://jwf0u3k0r5.execute-api.us-west-2.amazonaws.com/prod';
  // stripePublicKey = 'pk_live_FHmywJaXessS64PZR8tK5oOG';
  // firehoseName = 'prod-apptab-data-stream';
  // identityPoolId = 'us-west-2:de2417d3-d969-4d8d-8933-a839b732b415';
  // identityPoolName = 'cognito-idp.us-west-2.amazonaws.com/us-west-2_jVwSNIwOV';
  // apiKey = 'Qq6ECRuYbw6RlQ1Ii1tPd8LIkqh5n7or3eV31sEE';
  // imageBucket = 'prod-apptab-image-bucket';
  // useDevData = false;
  // loginPage = 'https://apptabproduserpool.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=4qivpbcdi56i9r46983rmtdhn2&redirect_uri=apptab://login';
  // userpoolUrl = 'https://apptabproduserpool.auth.us-west-2.amazoncognito.com';
  // userpoolClientId = '4qivpbcdi56i9r46983rmtdhn2';
  url = 'https://dahtdbe9u5.execute-api.us-west-2.amazonaws.com/dev';
  stripePublicKey = 'pk_test_UHQyJcNcx8C65lXY8h9xZwSN';
  firehoseName = 'dev-apptab-data-stream';
  identityPoolId = 'us-west-2:e68c2165-3d5b-4b58-9ba6-2aeaf7baea72';
  identityPoolName = 'cognito-idp.us-west-2.amazonaws.com/us-west-2_xtUwQOezW';
  apiKey = 'ma7vNxbdMd2V7pmUBh2hE9pxp9SMwYhZ3wBHnTQ4';
  imageBucket = 'dev-apptab-image-bucket';
  useDevData = false;
  loginPage = 'https://apptabdevuserpool.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=4lce6hkvpjhf17qqfivp6c5o8m&redirect_uri=apptab://login';
  userpoolUrl = 'https://apptabdevuserpool.auth.us-west-2.amazoncognito.com';
  userpoolClientId = '4lce6hkvpjhf17qqfivp6c5o8m';
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
  loginPage,
  userpoolUrl,
  userpoolClientId
}