const todoSchema = require('../schemas/todo');

module.exports = (fastify, opts, next) => {
    fastify.post('/', todoSchema.create, async () => {});

    fastify.get('/:todoId', todoSchema.getById, async () => {});

    fastify.put('/:todoId', todoSchema.update, async () => {});

    fastify.delete('/:todoId', todoSchema.remove, async () => {});

    next();
};
