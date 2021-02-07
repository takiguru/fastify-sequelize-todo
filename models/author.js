const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Author extends Model {}

    Author.init(
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Author',
        },
    );
    return Author;
};
