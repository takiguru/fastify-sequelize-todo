const internals = require('fastify-helmet');
const config = require('config');
const helmetConfig = config.get('helmet');

const onRegister = (instance) => {
    return Object.assign(
        {
            //Fix for swagger with helmet
            contentSecurityPolicy: {
                directives: {
                    ...internals.contentSecurityPolicy.getDefaultDirectives(),
                    'form-action': ["'self'"],
                    'img-src': ["'self'", 'data:', 'validator.swagger.io'],
                    'script-src': ["'self'"].concat(instance.swaggerCSP.script),
                    'style-src': ["'self'", 'https:'].concat(
                        instance.swaggerCSP.style,
                    ),
                },
            },
        },
        helmetConfig,
    );
};

module.exports = { internals, onRegister };
