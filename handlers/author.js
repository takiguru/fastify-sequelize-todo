const authorSchema = require('../schemas/author');

module.exports = (fastify, opts, next) => {
    fastify.post('/', authorSchema.create, async () => {});

    fastify.get('/:authorId', authorSchema.getById, async () => {});

    fastify.put('/:authorId', authorSchema.update, async () => {});

    fastify.delete('/:authorId', authorSchema.remove, async () => {});

    next();
};
