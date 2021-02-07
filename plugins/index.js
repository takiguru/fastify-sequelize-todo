const swaggerPlugin = require('./swagger');

const register = (fastify) => {
    fastify.register(swaggerPlugin.internals, swaggerPlugin.options);
};

module.exports = { register };
