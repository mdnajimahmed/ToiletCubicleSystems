import { Kafka } from 'kafkajs';

import {createMechanism } from '@jm18457/kafkajs-msk-iam-authentication-mechanism';

const kafka = new Kafka({
  brokers: ['boot-9ixeduhy.c3.kafka-serverless.ap-southeast-1.amazonaws.com:9098'],
  clientId: 'aLowL',
  ssl: true,
  sasl: createMechanism({ region: 'ap-southeast-1' })
});

const producer = kafka.producer();

export const produce = async (event) => {
    console.log("publishing event = ", event)
    try {
        console.log("connecting with kafka")
        await producer.connect();
        console.log("connected")
        const response = await producer.send(event);
        console.log("response :",response)
        await producer.disconnect();
        return response;
    } catch (e) {
        console.log("Error", e)
        throw e
    }
};