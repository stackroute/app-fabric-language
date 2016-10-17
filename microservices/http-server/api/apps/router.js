const Router = require('express').Router();
const controller = require('./controller');

Router.get('/',controller.retrieveAllApps);
Router.get('/app/:appId',controller.retrieveApp);
Router.get('/:appId/services',controller.retrieveAllServices);

module.exports = Router;
