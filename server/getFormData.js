var express = require('express');
var path = require('path');
var cloneGit = require('./cloneGit.js');
var bodyParser = require('body-parser');
var deployProject = require('./deployProject.js');
// create our app
var app = express();
var log = require('fs');

// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser());

app.use(function(req,res,next) {
  console.log('REQ BODY IS:',req.body);
   log.appendFile("./deployment_log.txt", "executing body-parser.", function(error){
	   if (error) return console.log(error);
	}) 
  next();
});

app.use(express.static(__dirname + '/../client'));

var scope = {
	cloning: {
		isComplete: false,
		isInProgress: false
	},
	buildImage: {
		isComplete: false,
		isInProgress: false
	},
	deployment: {
		isComplete: false,
		isInProgress: false
	}
};

// This route receives the posted form.
app.post('/deploy', function(req, res){
  var gitURL = req.body.gitURL;
  console.log("gitURL ",gitURL);
  cloneGit(gitURL, deployProject); 
  // cloneGit(gitURL, socket, deployProject.bind(this,socket));  
});

app.listen(8080);
