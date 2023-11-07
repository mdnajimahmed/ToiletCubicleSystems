import { Kafka } from 'kafkajs';

import {createMechanism } from '@jm18457/kafkajs-msk-iam-authentication-mechanism';

const kafka = new Kafka({
  brokers: ['boot-v5bvl8nq.c3.kafka-serverless.ap-southeast-1.amazonaws.com:9098'],
  clientId: 'aLowL',
  ssl: true,
  sasl: createMechanism({ region: 'ap-southeast-1' })
});

// const kafka = new Kafka({
//     clientId: 'aLowLLocal',
//     brokers: ['localhost:9093'],
//   })

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