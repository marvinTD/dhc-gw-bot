import Winston from 'winston';

const logger = new (Winston.Logger)({
  transports: [
    new (Winston.transports.Console)(),
    new (Winston.transports.File)({ filename: 'console.log' }),
  ],
});

export default logger;
