const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Todo extends Model {}

    Todo.init(
        {
            title: DataTypes.STRING,
            body: DataTypes.STRING,
            authorId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Todo',
        },
    );

    Todo.associate = function (models) {
        Todo.belongsTo(models.Author, { as: 'author', foreignKey: 'authorId' });
    };

    return Todo;
};
