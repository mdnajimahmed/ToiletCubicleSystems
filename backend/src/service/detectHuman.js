// import AWS from 'aws-sdk';
import {AWS} from '../util/aws.js'
const s3 = new AWS.S3();

import { invokeLambda } from './invokeLambda.js';

const rekognition = new AWS.Rekognition();

const deleteSnapshot = async (bucketName, key)=>{
    const params = {
        Bucket: bucketName,
        Key: key
    };
    console.log("deleting",params)
    return await s3.deleteObject(params).promise()
}
const extractImageLocation = event => {
    if (event?.Records?.length > 0) {
        const recordS3 = event?.Records[0].s3
        return { bucketName: recordS3?.bucket?.name, key: recordS3?.object?.key }
    } else {
        return event
    }
}

const publishKafkaEvent = async (bucketName,key,isThereAPerson)=>{
    const message = {
        bucketName,key,isThereAPerson
    }
    const kInput = {
        topic: 'alowl',
        messages: [
          {
            value: JSON.stringify(message),
            key:"alowlCam01"
          },
        ],
      }
      console.log("producting",kInput)
      const response = await invokeLambda("toilet-cubicle-system-dev-kafkaPublish",kInput)
    //   const response = await produce(kInput)
      console.log("response",response)
}
export const detectHuman = async (event) => {
    console.log("event", event)
    const { bucketName, key } = extractImageLocation(event)
    console.log(`bucketName = ${bucketName}`)
    console.log(`key = ${key}`)
    const isThereAPerson = await detectPersonsInImage(bucketName, key)
    console.log("isThereAPerson",isThereAPerson)
    if (isThereAPerson) {
        console.log("person detected")
    } else {
        console.log("Empty picture")
    }
    await publishKafkaEvent(bucketName,key,isThereAPerson)
    const deleteResponse = await deleteSnapshot(bucketName, key)
    console.log("deleteResponse",deleteResponse)
    // send this event to (kafka)
    // kafka stream to calculate the latest status of the cubicle (elastic beanstalk + elasticache)
    // if a status change is detected send a push notification (AGW WS)
    // when a person leaves calculate his total usage, publish a event to sqs and enrich the person id attached.
    // amazon forecast service to forecast when it will be free or occupied.
    // S3 cloudfront for front end
    // dynamodb to store things
    // alert user with SES if any health issue.
    // alert user with SNS if any health issue.
    // CICD services
    // SSM, KMS,
    // Cognito for log in
    // Glue and quicksight to analyze daily events
}

const detectPersonsInImage = async (bucket, key) => {
    const params = {
        Image: {
            S3Object: {
                Bucket: bucket,
                Name: key,
            },
        },
        MinConfidence: 80,
    };
    console.log("detecting person in image with param",params)
    const data = await rekognition.detectLabels(params).promise();
    console.log("data", JSON.stringify(data))
    const labels = data?.Labels.filter(label => label.Name.toLowerCase().includes('person') || label.Name.toLowerCase().includes('human')) || [];
    console.log("human labels", JSON.stringify(labels))
    return labels.length > 0
}
