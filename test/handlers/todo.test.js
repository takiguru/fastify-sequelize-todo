const build = require('../../server');

describe('/author', () => {
    let service;
    beforeAll(async () => {
        service = await build();
        //create author for test id will be `1`
        await service.inject({
            method: 'POST',
            url: '/author',
            payload: {
                firstName: 'John',
                lastName: 'Doe',
            },
        });
    });

    afterAll(async () => {
        await service.close();
    });

    test('create todo for non existing user', async () => {
        const response = await service.inject({
            method: 'POST',
            url: '/todo/123',
            payload: {
                title: 'Simulation hypothesis',
                body: 'We are living in a simulated world',
            },
        });
        expect(response.statusCode).toEqual(404);
    });

    test('create todo without `title`', async () => {
        const response = await service.inject({
            method: 'POST',
            url: '/todo/1',
            payload: {
                body: 'We are living in a simulated world',
            },
        });
        expect(response.statusCode).toEqual(400);
    });

    test('create todo without `body`', async () => {
        const response = await service.inject({
            method: 'POST',
            url: '/todo/1',
            payload: {
                title: 'Simulation hypothesis',
            },
        });
        expect(response.statusCode).toEqual(400);
    });

    test('create todo with short `title`', async () => {
        const response = await service.inject({
            method: 'POST',
            url: '/todo/1',
            payload: {
                title: 'AS',
            },
        });
        expect(response.statusCode).toEqual(400);
    });

    test('create todo with short `body`', async () => {
        const response = await service.inject({
            method: 'POST',
            url: '/todo/1',
            payload: {
                body: 'We a',
            },
        });
        expect(response.statusCode).toEqual(400);
    });

    test('create todo with good data', async () => {
        const response = await service.inject({
            method: 'POST',
            url: '/todo/1',
            payload: {
                title: 'Simulation hypothesis',
                body: 'We are living in a simulated world',
            },
        });
        expect(response.statusCode).toEqual(200);
        expect(response.json()).toStrictEqual({
            id: 1,
            authorId: 1,
            title: 'Simulation hypothesis',
            body: 'We are living in a simulated world',
        });
    });

    test('get todo with bad parameter', async () => {
        const response = await service.inject({
            method: 'GET',
            url: '/todo/nope',
        });
        expect(response.statusCode).toEqual(400);
    });

    test('get not existing todo ', async () => {
        const response = await service.inject({
            method: 'GET',
            url: '/todo/123',
        });
        expect(response.statusCode).toEqual(404);
    });

    test('get author with good parameter', async () => {
        const response = await service.inject({
            method: 'GET',
            url: '/todo/1',
        });
        expect(response.statusCode).toEqual(200);
        expect(response.json()).toStrictEqual({
            id: 1,
            title: 'Simulation hypothesis',
            body: 'We are living in a simulated world',
            author: {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
            },
        });
    });

    test('update non existing todo', async () => {
        const response = await service.inject({
            method: 'PUT',
            url: '/todo/123',
            payload: {
                title: 'Jack',
            },
        });
        expect(response.statusCode).toEqual(404);
    });

    test('update todo title', async () => {
        const response = await service.inject({
            method: 'PUT',
            url: '/todo/1',
            payload: {
                title: 'Anti Simulation hypothesis',
            },
        });
        expect(response.statusCode).toEqual(200);
        expect(response.json()).toStrictEqual({
            title: 'Anti Simulation hypothesis',
            body: 'We are living in a simulated world',
        });
    });

    test('update todo body', async () => {
        const response = await service.inject({
            method: 'PUT',
            url: '/todo/1',
            payload: {
                body: 'The world is not simulated',
            },
        });
        expect(response.statusCode).toEqual(200);
        expect(response.json()).toStrictEqual({
            title: 'Anti Simulation hypothesis',
            body: 'The world is not simulated',
        });
    });

    test('delete non existing todo ', async () => {
        const response = await service.inject({
            method: 'DELETE',
            url: '/todo/123',
        });
        expect(response.statusCode).toEqual(404);
    });

    test('delete todo with bad parameter', async () => {
        const response = await service.inject({
            method: 'DELETE',
            url: '/author/asd',
        });
        expect(response.statusCode).toEqual(400);
    });

    test('delete todo with good parameter', async () => {
        const response = await service.inject({
            method: 'DELETE',
            url: '/todo/1',
        });
        expect(response.statusCode).toEqual(200);
    });
});
