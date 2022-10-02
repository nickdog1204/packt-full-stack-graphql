const winston = require('winston')
let transports = [
    new winston.transports.File({
        filename: 'error.log',
        level: 'error'
    }),
    new winston.transports.File({
        filename: 'combined.log',
        level: 'verbose'
    })
];
if ('production' !== process.env.NODE_ENV) {
    transports.push(new winston.transports.Console())
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports
})
module.exports = logger;