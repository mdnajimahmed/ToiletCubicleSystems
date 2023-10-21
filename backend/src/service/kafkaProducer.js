import { Kafka } from 'kafkajs';
// import { IAMAuth } from '@jm18457/kafkajs-msk-iam-authentication-mechanism';

// const kafka = new Kafka({
//     brokers: ['boot-9ixeduhy.c3.kafka-serverless.ap-southeast-1.amazonaws.com:9098'],
//     authenticationMechanism: new IAMAuth({
//         region: 'ap-southeast-1',
//         mwsRoleArn: 'arn:aws:iam::367739249270:role/toilet-cubicle-system-dev-ap-southeast-1-lambdaRole',
//     }),
// });

import {createMechanism } from '@jm18457/kafkajs-msk-iam-authentication-mechanism';

const kafka = new Kafka({
  brokers: ['boot-9ixeduhy.c3.kafka-serverless.ap-southeast-1.amazonaws.com:9098'],
  clientId: 'aLowL',
  ssl: true,
  sasl: createMechanism({ region: 'ap-southeast-1' })
});

const producer = kafka.producer();

export const produce = async (topic, messages) => {
    try {
        console.log("connecting with kafka")
        await producer.connect();
        console.log("connected")
        const response = await producer.send(topic, messages);
        await producer.disconnect();
        return response;
    } catch (e) {
        console.log("Error", e)
        throw e
    }
};