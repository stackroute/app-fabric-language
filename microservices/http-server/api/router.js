const Router = require('express').Router();

Router.use('/auth',require('./auth/router'));
Router.use('/api/v1/apps',require('./apps/router'));
Router.use('/api/v1/github',require('./github/github.router'));

module.exports = Router;
