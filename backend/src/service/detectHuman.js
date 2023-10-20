import AWS from 'aws-sdk';
const rekognition = new AWS.Rekognition();

const extractImageLocation = event => {
    if (event?.Records?.length > 0) {
        const recordS3 = event?.Records[0].s3
        return { bucketName: recordS3?.bucket?.name, key: recordS3?.object?.key }
    } else {
        return event
    }
}
export const detectHuman = async (event) => {
    console.log("event", event)
    const { bucketName, key } = extractImageLocation(event)
    console.log(`bucketName = ${bucketName}`)
    console.log(`key = ${key}`)
    const isThereAPerson = await detectPersonsInImage(bucketName, key)
    if (isThereAPerson) {
        console.log("person detected")
    } else {
        console.log("Empty picture")
    }

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
    const data = await rekognition.detectLabels(params).promise();
    console.log("data", JSON.stringify(data))
    const labels = data?.Labels.filter(label => label.Name.toLowerCase().includes('person') || label.Name.toLowerCase().includes('human')) || [];
    console.log("human labels", JSON.stringify(labels))
    return labels.length > 0
}
