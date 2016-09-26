const Router = require('express').Router();

Router.use('/auth',require('./auth/router'));

module.exports = Router;
