const Router = require('express').Router();
const controller = require('./github.controller');

Router.get('/repos',controller.getRepos);
Router.get('/repo/:owner/:reponame/branches',controller.getBranches);

module.exports = Router;
