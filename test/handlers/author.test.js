const build = require('../../server');

describe('/todo', () => {
    let service;
    beforeAll(async () => {
        service = await build();
    });

    afterAll(async () => {
        await service.close();
    });

    test('create author without `firstName`', async () => {
        const response = await service.inject({
            method: 'POST',
            url: '/author',
            payload: {
                lastName: 'Doe',
            },
        });
        expect(response.statusCode).toEqual(400);
    });

    test('create author without `lastName`', async () => {
        const response = await service.inject({
            method: 'POST',
            url: '/author',
            payload: {
                firstName: 'Doe',
            },
        });
        expect(response.statusCode).toEqual(400);
    });

    test('create author with short `firstName`', async () => {
        const response = await service.inject({
            method: 'POST',
            url: '/author',
            payload: {
                firstName: 'J',
            },
        });
        expect(response.statusCode).toEqual(400);
    });

    test('create author with short `lastName`', async () => {
        const response = await service.inject({
            method: 'POST',
            url: '/author',
            payload: {
                lastName: 'D',
            },
        });
        expect(response.statusCode).toEqual(400);
    });

    test('create author with good parameters', async () => {
        const response = await service.inject({
            method: 'POST',
            url: '/author',
            payload: {
                firstName: 'John',
                lastName: 'Doe',
            },
        });
        expect(response.statusCode).toEqual(200);
        expect(response.json()).toStrictEqual({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
        });
    });

    test('get author with bad parameter', async () => {
        const response = await service.inject({
            method: 'GET',
            url: '/author/nope',
        });
        expect(response.statusCode).toEqual(400);
    });

    test('get not existing author ', async () => {
        const response = await service.inject({
            method: 'GET',
            url: '/author/123',
        });
        expect(response.statusCode).toEqual(404);
    });

    test('get author with good parameter', async () => {
        const response = await service.inject({
            method: 'GET',
            url: '/author/1',
        });
        expect(response.statusCode).toEqual(200);
        expect(response.json()).toStrictEqual({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            todos: [],
        });
    });

    test('update non existing author', async () => {
        const response = await service.inject({
            method: 'PUT',
            url: '/author/123',
            payload: {
                firstName: 'Jack',
            },
        });
        expect(response.statusCode).toEqual(404);
    });

    test('update author firstName', async () => {
        const response = await service.inject({
            method: 'PUT',
            url: '/author/1',
            payload: {
                firstName: 'Jack',
            },
        });
        expect(response.statusCode).toEqual(200);
        expect(response.json()).toStrictEqual({
            firstName: 'Jack',
            lastName: 'Doe',
        });
    });

    test('update author lastName', async () => {
        const response = await service.inject({
            method: 'PUT',
            url: '/author/1',
            payload: {
                lastName: 'Sparrow',
            },
        });
        expect(response.statusCode).toEqual(200);
        expect(response.json()).toStrictEqual({
            firstName: 'Jack',
            lastName: 'Sparrow',
        });
    });

    test('delete non existing author ', async () => {
        const response = await service.inject({
            method: 'DELETE',
            url: '/author/123',
        });
        expect(response.statusCode).toEqual(404);
    });

    test('delete author with bad parameter', async () => {
        const response = await service.inject({
            method: 'DELETE',
            url: '/author/asd',
        });
        expect(response.statusCode).toEqual(400);
    });

    test('delete author with good parameter', async () => {
        const response = await service.inject({
            method: 'DELETE',
            url: '/author/1',
        });
        expect(response.statusCode).toEqual(200);
    });
});
