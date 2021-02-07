const shared = require('./shared');

const create = {
    schema: {
        description: 'Create new todo',
        params: {
            type: 'object',
            properties: {
                authorId: { type: 'number' },
            },
        },
        body: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                body: { type: 'string' },
            },
        },
        response: {
            200: {
                description: 'Todo created',
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    authorId: { type: 'number' },
                    title: { type: 'string' },
                    body: { type: 'string' },
                },
            },
            400: {
                description: 'Creating a new todo failed',
                type: 'object',
                properties: shared.defaultErrorResponse,
            },
            404: {
                description: 'Author not found',
                type: 'object',
                properties: shared.defaultErrorResponse,
            },
        },
    },
};

const getById = {
    schema: {
        description: 'Get todo by id',
        params: {
            type: 'object',
            properties: {
                todoId: { type: 'number' },
            },
        },
        response: {
            200: {
                description: 'Todo found',
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    title: { type: 'string' },
                    body: { type: 'string' },
                    author: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            firstName: { type: 'string' },
                            lastName: { type: 'string' },
                        },
                    },
                },
            },
            404: {
                description: 'Todo not found',
                type: 'object',
                properties: shared.defaultErrorResponse,
            },
        },
    },
};

const update = {
    schema: {
        description: 'Update todo by id',
        params: {
            type: 'object',
            properties: {
                todoId: { type: 'number' },
            },
        },
        body: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                body: { type: 'string' },
            },
        },
        response: {
            200: {
                description: 'Todo updated',
                type: 'object',
                properties: {
                    title: { type: 'string' },
                    body: { type: 'string' },
                },
            },
            400: {
                description: 'Updating todo failed',
                type: 'object',
                properties: shared.defaultErrorResponse,
            },
            404: {
                description: 'Todo not found',
                type: 'object',
                properties: shared.defaultErrorResponse,
            },
        },
    },
};

const remove = {
    schema: {
        description: 'Delete todo by id',
        params: {
            type: 'object',
            properties: {
                todoId: { type: 'number' },
            },
        },
        response: {
            200: {
                description: 'Todo deleted',
                type: 'object',
                properties: {},
            },
            400: {
                description: 'Deleting todo failed',
                type: 'object',
                properties: shared.defaultErrorResponse,
            },
            404: {
                description: 'Todo not found',
                type: 'object',
                properties: shared.defaultErrorResponse,
            },
        },
    },
};

module.exports = { create, getById, update, remove };
