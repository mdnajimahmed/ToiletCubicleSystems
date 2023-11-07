
// import AWS from 'aws-sdk';
import {AWS} from '../util/aws.js'
const s3 = new AWS.S3();
const rekognition = new AWS.Rekognition();


const indexFaces = async (bucket, key) => {
    console.log("bucket",bucket,"key",key)
    const params = {
      Image: {
        S3Object: {
          Bucket: bucket,
          Name: key,
        },
      },
      CollectionId: 'facerecognition_collection',
    };

    return await rekognition.indexFaces(params).promise();
  }



export const addNewUser = async (event)=>{
    const {bucketName,userName} = event
    console.log(`bucketName = ${bucketName}`)
    console.log(`userName = ${userName}`)
    const files = await listFiles(bucketName,userName)
    console.log("files",files)
    console.log("File sample data",files[0])
    const index = await indexFaces(bucketName,files[0].Key)
    console.log("index",JSON.stringify(index))
}

const listFiles = async (bucketName,key)=>{
    const params = {
        Prefix: key,
        Bucket: bucketName
    }
    
    const data = await s3.listObjectsV2(params).promise();
    if(data?.Contents?.length > 0){
        return data?.Contents?.slice(1)
    }
    return [];
}