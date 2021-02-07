const fastify = require('fastify');
const config = require('config');
const serviceConfig = config.get('service');

const startup = async () => {
    const service = fastify(Object.assign({}, serviceConfig.options));
    try {
        await service.listen(serviceConfig.port, serviceConfig.host);
    } catch (error) {
        service.log.error(error);
        process.exit(1);
    }
    return service;
};

module.exports = startup();
