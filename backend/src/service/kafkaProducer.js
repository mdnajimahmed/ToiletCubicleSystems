import {Kafka} from 'kafkajs';
const { IAMAuth } = require('@jm18457/kafkajs-msk-iam-authentication-mechanism');

const kafka = new Kafka({
    brokers: ['boot-9ixeduhy.c3.kafka-serverless.ap-southeast-1.amazonaws.com:9098'],
    authenticationMechanism: new IAMAuth({
      region: 'ap-southeast-1',
      mwsRoleArn: 'arn:aws:iam::367739249270:role/toilet-cubicle-system-dev-ap-southeast-1-lambdaRole',
    }),
  });
  
  const producer = kafka.producer();
  
  const run = async () => {
    await producer.connect();
    await producer.send({
      topic: '<YOUR_TOPIC>',
      messages: [
        {
          value: 'Hello, world!',
        },
      ],
    });
  
    await producer.disconnect();
  };
  
  run().catch(console.error);