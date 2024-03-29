const fastify = require('fastify');
const plugins = require('./plugins');
const config = require('config');
const serviceConfig = config.get('service');
const databaseConfig = config.get('database');
const database = require('./models');

//Handlers
const authorHandler = require('./handlers/author');
const todoHandler = require('./handlers/todo');

const build = async () => {
    const service = fastify(Object.assign({}, serviceConfig.options));
    plugins.register(service);
    service.register(authorHandler, { prefix: '/author' });
    service.register(todoHandler, { prefix: '/todo' });
    service.decorate('database', database);
    try {
        await database.sequelize.authenticate();
        await database.sequelize.sync({
            force: databaseConfig.forceSync,
        });
        await service.listen(serviceConfig.port, serviceConfig.host);
    } catch (error) {
        service.log.error(error);
        process.exit(1);
    }
    return service;
};

module.exports = build;
