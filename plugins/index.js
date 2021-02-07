const swaggerPlugin = require('./swagger');
const helmetPlugin = require('./helmet');

const register = (fastify) => {
    fastify.register(swaggerPlugin.internals, swaggerPlugin.options);
    fastify.register(helmetPlugin.internals, helmetPlugin.options);
};

module.exports = { register };
