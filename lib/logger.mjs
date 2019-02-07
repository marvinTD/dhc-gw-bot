import Winston from 'winston';

const streams = [new (Winston.transports.File)({ filename: 'console.log' })];
if (process.env.NODE_ENV !== 'production') {
  streams.push(new (Winston.transports.Console)());
}

const logger = new (Winston.Logger)({
  transports: streams,
});

export default logger;
