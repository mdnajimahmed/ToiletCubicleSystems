import {Server} from './src/interfaces/server.js';
import * as routes from './src/controllers/routes.index.js'

export const handler = async (event, context) => {
    const server = new Server('/sample',routes);
    return await server.handle(event,context);
};

if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const server = new Server('/sample',routes);
    await server.startOnPort(3050)
} 