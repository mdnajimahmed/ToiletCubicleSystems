import winston from 'winston';
import ecsFormat from '@elastic/ecs-winston-format';

const logger = winston.createLogger({
    format: ecsFormat(),
    level: 'debug',
    transports: [
      new winston.transports.Console()
    ]
  });

export {logger} ;
