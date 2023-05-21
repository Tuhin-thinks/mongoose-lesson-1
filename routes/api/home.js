const ApiRouter = require('express').Router();

const UserRouter = require('./user/user.js');

ApiRouter.get('/', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

ApiRouter.use('/users', UserRouter);

module.exports = ApiRouter;
