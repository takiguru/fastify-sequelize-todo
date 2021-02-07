const internals = require('fastify-helmet');
const config = require('config');
const helmetConfig = config.get('helmet');
const options = helmetConfig;

module.exports = { internals, options };
