const shared = require('./shared');

const create = {
    schema: {
        description: 'Create new author',
        body: {
            type: 'object',
            required: ['firstName', 'lastName'],
            properties: {
                firstName: { type: 'string', minLength: 2, maxLength: 250 },
                lastName: { type: 'string', minLength: 2, maxLength: 250 },
            },
        },
        response: {
            200: {
                description: 'Author created',
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                },
            },
            400: {
                description: 'Creating a new author failed',
                type: 'object',
                properties: shared.defaultErrorResponse,
            },
        },
    },
};

const getById = {
    schema: {
        description: 'Get by author id',
        params: {
            type: 'object',
            properties: {
                authorId: { type: 'number' },
            },
        },
        response: {
            200: {
                description: 'Author found',
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    todos: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                title: { type: 'string' },
                                body: { type: 'string' },
                            },
                        },
                    },
                },
            },
            404: {
                description: 'Author not found',
                type: 'object',
                properties: shared.defaultErrorResponse,
            },
        },
    },
};

const update = {
    schema: {
        description: 'Update author by id',
        params: {
            type: 'object',
            properties: {
                authorId: { type: 'number' },
            },
        },
        body: {
            type: 'object',
            properties: {
                firstName: { type: 'string', minLength: 2, maxLength: 250 },
                lastName: { type: 'string', minLength: 2, maxLength: 250 },
            },
        },
        response: {
            200: {
                description: 'Author updated',
                type: 'object',
                properties: {
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                },
            },
            400: {
                description: 'Updating author failed',
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

const remove = {
    schema: {
        description: 'Delete author by id',
        params: {
            type: 'object',
            properties: {
                authorId: { type: 'number' },
            },
        },
        response: {
            200: {
                description: 'Author deleted',
                type: 'object',
                properties: {},
            },
            400: {
                description: 'Deleting author failed',
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

module.exports = { create, getById, update, remove };
