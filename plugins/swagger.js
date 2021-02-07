const config = require('config');
const swaggerConfig = config.get('swagger');

const internals = require('fastify-swagger');
const packageDetails = require('../package');

const options = () => {
    return {
        routePrefix: '/swagger',
        swagger: {
            info: {
                title: swaggerConfig.title,
                description: swaggerConfig.description,
                version: packageDetails.version,
            },
        },
        exposeRoute: swaggerConfig.enabled,
    };
};

module.exports = { internals, options };
