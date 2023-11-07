// import AWSXRay from 'aws-xray-sdk-core';
// import * as AWSALL from 'aws-sdk';
// const AWS = AWSXRay.captureAWS(AWSALL)

// // Configure the context missing strategy to do nothing

// import AWSXRay from 'aws-xray-sdk-core';
// import AWSNoXray from 'aws-sdk';

// const AWS = AWSXRay.captureAWS(AWSNoXray);

// 

// export { AWSXRay, AWS };



import AWSXRay from 'aws-xray-sdk-core';
import AWSNoXray from 'aws-sdk';
AWSXRay.setContextMissingStrategy(() => {});
const AWS = AWSXRay.captureAWS(AWSNoXray);
// export const dynamoClient = new AWS.DynamoDB.DocumentClient({
//     service: new AWS.DynamoDB()
// });
// export const snsClient = new AWS.SNS();
// export const smsClient = new AWS.SSM();

const apig = new AWS.ApiGatewayManagementApi({
    endpoint: process.env.APIG_ENDPOINT
  });
const dynamodb = new AWS.DynamoDB.DocumentClient();

export { AWSXRay, AWS ,apig, dynamodb};
