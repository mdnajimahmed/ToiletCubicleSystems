import { Server } from './src/interfaces/server.js';
import * as routes from './src/controllers/routes.index.js';
import { addNewUser } from './src/service/train.js'
import { detectHuman } from './src/service/detectHuman.js';
import { produce } from './src/service//kafkaProducer.js';


export const api = async (event, context) => {
    const server = new Server('/sample', routes);
    return await server.handle(event, context);
};

export const train = async (event, context) => {
    await addNewUser(event)
};
export const detect = async (event, context) => {
    await detectHuman(event)
};

export const kafkaPublish = async (event, context) => {
    console.log("event", event)
    const kafkaResponse = await produce(event)
    console.log("kafkaResponse", kafkaResponse)
};


// if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
//     const server = new Server('/sample',routes);
//     await server.startOnPort(3050)
// } 


// if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
//     const args = process.argv;
//     const scriptArgs = args.slice(2);
//     const value = JSON.stringify(
//         {
//             "bucketName": "a-low-l-snapshots",
//             "key": scriptArgs[0] ,
//             "isThereAPerson": true,
//             "snapshotTime": scriptArgs[1] || Math.floor(new Date().getTime())
//         }
//     )
//     console.log("value",value)


//     await produce({
//         topic: 'alowl',
//         messages: [
//             {
//                 key: 'aLowL',
//                 value: value
//             }
//         ]
//     })
// }
