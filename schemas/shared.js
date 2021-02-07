const defaultErrorResponse = {
    statusCode: { type: 'number' },
    error: { type: 'string', optional: true },
    message: { type: 'string' },
};

module.exports = { defaultErrorResponse };
