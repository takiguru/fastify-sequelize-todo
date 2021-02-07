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

    Author.associate = function (models) {
        Author.hasMany(models.Todo, {
            foreignKey: {
                name: 'authorId',
            },
            as: 'todos',
            onDelete: 'CASCADE',
            hooks: true,
        });
    };

    return Author;
};
