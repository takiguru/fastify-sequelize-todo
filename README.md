# TODO App

## Description

This project is a todo application for demo purpose.

## Used frameworks
- Fastify for API endpoints: https://www.fastify.io/
- Sequelize ORM for database: https://sequelize.org/
- Jest for testing: https://jestjs.io/

## Known issues
- Test stuck withot --forceExit parameter. Maybe something wrong with the close function

## Future plans
- More strict schemas
- Add more test cases
- Mock database for testing. Sequelize-mock looks promising: https://sequelize-mock.readthedocs.io/

## Running the app

Option 1: Running locally

Requirements:

- Node.js LTS ( version 14.x ATM )
- PostgreSQL with an empty database set in config

### Installation

```bash
$ npm install
$ npm database:migrate (optional)
```

### Start commands

```bash
# start
$ npm run start

# watch mode
$ npm run start:dev
```

Option 2: Running docker compose

Requirements:

- Docker
- Proper configuration in the .env file

```bash
docker-compose up
```

## Test

```bash
$ npm run test
```