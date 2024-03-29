const sequelizeCli = require('config');
const sequelizeConfig = sequelizeCli.get('database.sequelizeOptions');

const currentEnvironment = process.env.NODE_ENV || 'development';

const configuration = {
    [currentEnvironment]: sequelizeConfig,
};

module.exports = configuration;
