const Router = require('express').Router();

Router.use('/auth',require('./auth/router'));
Router.use('/api/v1',require('./apps/router'));

module.exports = Router;
