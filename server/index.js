const db = require('./database');
const utils = {
    db,
}
const express = require('express');
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const servicesLoader = require('./services');
const services = servicesLoader(utils)


const app = express();
app.use(compression());
if ('production' === process.env.NODE_ENV) {
    app.use(helmet());
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "*.amazonaws.com"]
        }
    }))
    app.use(
        helmet.referrerPolicy(
            {policy: 'same-origin'}
        )
    )

}
app.use(cors());
const root = path.join(__dirname, '../');


const serviceNames = Object.keys(services);
serviceNames.forEach((name, idx) => {
    const service = services[name];
    if ('graphql' === name) {
        service.start()
            .then(() => {
                service.applyMiddleware({app})
            })

    } else {
        app.use(`/${name}`, service)

    }
})


app.use('/', (req, res, next) => {
    console.log('firrrrst', req.url);
    next();
}, express.static(path.join(root, 'build')))
app.get('/', (req, res) => {
    console.log('sendFile')
    res.sendFile(path.join(root, 'build', 'index.html'))
})

app.listen(8000, () => {
    console.log('Server listening on port 8000')
})
