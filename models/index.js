const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('config');
const databaseConfig = config.get('database');
const database = {};

const sequelize = new Sequelize(databaseConfig.sequelizeOptions);

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes,
        );
        database[model.name] = model;
    });

Object.keys(database).forEach((modelName) => {
    if (database[modelName].associate) {
        database[modelName].associate(database);
    }
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;
