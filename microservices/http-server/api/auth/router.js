const Router = require('express').Router();

Router.use('/github',require('./github/router'));

module.exports = Router;
