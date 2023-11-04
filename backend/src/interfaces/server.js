import express from 'express';
import awsServerlessExpress from 'aws-serverless-express';
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors'
import { logger } from '../util/logger.js';
import { HTTP_METHODS } from '../config/httpMethods.js';

let server;

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
  }

const requestLogger = (req, res, next) => {
    const reqSubset = {
        httpVersion: req.httpVersion,
        rawHeaders: req.rawHeaders,
        url: req.url,
        method: req.method,
        baseUrl: req.baseUrl,
        params: req.params,
        query: req.query,
        body: req.body,
        originalUrl: req.originalUrl
    }
    logger.debug(`Request = ${Buffer.from(JSON.stringify(reqSubset)).toString('base64')}}`)
    next()
}

const startServer = async (rootPath, routes) => {
    if (!server) {
        server = express();
        registerMiddlewares()
        reginsterRoutes(rootPath, routes)
    }
    // await database.getConnection();
    return server;
};



const registerMiddlewares = () => {
    server.use(cors(corsOptions))
    server.use(bodyParser.json());
    server.use(requestLogger)
}

// reginster routes
const reginsterRoutes = (rootPath, routes) => {
    Object.values(routes)
    .map(route=> ({
        ...route,
        path:`${rootPath}${route.path}`

    })).forEach(api => {
        switch (api.method) {
            case HTTP_METHODS.GET:
                server.get(api.path, api.handler)
                break
            case HTTP_METHODS.POST:
                server.post(api.path, api.handler)
                break
            case HTTP_METHODS.PUT:
                server.put(api.path, api.handler)
                break
            case HTTP_METHODS.DELETE:
                server.delete(api.path, api.handler)
                break
            case HTTP_METHODS.PATCH:
                server.patch(api.path, api.handler)
                break
            case HTTP_METHODS.OPTIONS:
                server.options(api.path, api.handler)
                break
            case HTTP_METHODS.ANY:
                server.use(api.path, api.handler)
                break
        }
    })
}


class Server {
    constructor(rootPath, routes) {
        this.routes = routes
        this.rootPath = rootPath
    }
    async handle(event, context, basePath) {
        context.callbackWaitsForEmptyEventLoop = false;
        const executionId = context.awsRequestId;
        logger.defaultMeta = { executionId: executionId };
        event.path = event.path.replace(basePath, '');
        logger.info(`Request: ${event.httpMethod}: ${event.path}`);
        logger.debug('Starting server...', executionId);
        const server = await startServer(this.rootPath, this.routes);
        logger.debug('Successfully started server');
        const app = awsServerlessExpress.createServer(server);
        if (event.body && event.headers['Content-Type']?.includes('multipart/form-data')) {
            event.body = Buffer.from(event.body, 'binary');
        }
        const response = await awsServerlessExpress.proxy(app, event, context, 'PROMISE').promise;
        response.headers['X-Lambda-Execution-Id'] = executionId;
        logger.debug(`Response = ${Buffer.from(JSON.stringify(response)).toString('base64')}}`)
        return response;
    }
    async startOnPort(port) {
        const server = await startServer(this.rootPath, this.routes);
        logger.defaultMeta = { executionId: uuidv4() };
        server.listen(port, () => {
            console.log(`server listening on port ${port}`)
        })
    }
}
export { Server }