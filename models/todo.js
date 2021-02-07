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
    return Todo;
};
