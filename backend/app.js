import {Server} from './src/interfaces/server.js';
import * as routes from './src/controllers/routes.index.js';
import {addNewUser} from './src/service/train.js'
import {detectHuman} from './src/service/detectHuman.js';
import {produce} from './src/service/kafkaProducer.js';


export const api = async (event, context) => {
    const server = new Server('/sample',routes);
    return await server.handle(event,context);
};

export const train = async (event, context) => {
    await addNewUser(event)
};
export const detect = async (event, context) => {
    // await detectHuman(event)
    const kInput = {
        topic: 'alowl',
        messages: [
          {
            value: 'Hello, world!'
          },
        ],
      }
      console.log("producting",kInput)
      const response = await produce(kInput)
      console.log("response",response)
};


if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const server = new Server('/sample',routes);
    await server.startOnPort(3050)
} 