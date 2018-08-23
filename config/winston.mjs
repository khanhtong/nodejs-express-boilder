import winston from 'winston';

const winstonInstance = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      // level: 'trace',
      prettyPrint: true,
      json: true,
      colorize: true,
      silent: false,
      timestamp: false
    })
  ]
});

export default winstonInstance;
