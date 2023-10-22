import AWS from 'aws-sdk';
AWS.config.update({ region: 'ap-southeast-1' });
const lambda = new AWS.Lambda();

export const invokeLambda = async (functionName, payload) => {
    const params = {
        FunctionName: functionName,
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify(payload),
    };
    const data = await lambda.invoke(params).promise()
    return JSON.parse(data.Payload);
}
