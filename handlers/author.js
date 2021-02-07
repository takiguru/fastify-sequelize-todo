const authorSchema = require('../schemas/author');

module.exports = (fastify, opts, next) => {
    fastify.post('/', authorSchema.create, async (request) => {
        return fastify.database.Author.create(request.body);
    });

    fastify.get('/:authorId', authorSchema.getById, async (request) => {
        const author = await fastify.database.Author.findOne({
            where: { id: request.params.authorId },
            include: ['todos'],
        });
        if (!author) {
            throw {
                statusCode: 404,
                message: 'Author not found',
            };
        }
        return author;
    });

    fastify.put('/:authorId', authorSchema.update, async (request) => {
        const author = await fastify.database.Author.findOne({
            where: { id: request.params.authorId },
        });
        if (!author) {
            throw {
                statusCode: 404,
                message: 'Author not found',
            };
        }
        return await author.update(request.body);
    });

    fastify.delete('/:authorId', authorSchema.remove, async (request) => {
        const author = await fastify.database.Author.findOne({
            where: { id: request.params.authorId },
        });
        if (!author) {
            throw {
                statusCode: 404,
                message: 'Author not found',
            };
        }
        await author.removeTodos();
        return await author.destroy();
    });

    next();
};
