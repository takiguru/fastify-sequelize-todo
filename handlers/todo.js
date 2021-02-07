const todoSchema = require('../schemas/todo');

module.exports = (fastify, opts, next) => {
    fastify.post('/:authorId', todoSchema.create, async (request) => {
        const author = await fastify.database.Author.findOne({
            where: { id: request.params.authorId },
        });
        if (!author) {
            throw {
                statusCode: 404,
                message: 'Author not found',
            };
        }
        request.body.authorId = request.params.authorId;
        const todo = await fastify.database.Todo.create(request.body);
        await author.addTodo(todo);
        return todo;
    });

    fastify.get('/:todoId', todoSchema.getById, async (request) => {
        const todo = await fastify.database.Todo.findOne({
            where: { id: request.params.todoId },
            include: ['author'],
        });
        if (!todo) {
            throw {
                statusCode: 404,
                message: 'Todo not found',
            };
        }
        return todo;
    });

    fastify.put('/:todoId', todoSchema.update, async (request) => {
        const todo = await fastify.database.Todo.findOne({
            where: { id: request.params.todoId },
        });
        if (!todo) {
            throw {
                statusCode: 404,
                message: 'Todo not found',
            };
        }
        return await todo.update(request.body);
    });

    fastify.delete('/:todoId', todoSchema.remove, async (request) => {
        const todo = await fastify.database.Todo.findOne({
            where: { id: request.params.todoId },
        });
        if (!todo) {
            throw {
                statusCode: 404,
                message: 'Todo not found',
            };
        }
        return await todo.destroy();
    });

    next();
};
