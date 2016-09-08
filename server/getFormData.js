var express = require('express');
var path = require('path');
var cloneGit = require('./cloneGit.js');
var bodyParser = require('body-parser');
var deployProject = require('./deployProject.js');
var log = require('fs');
var logfile = "./deployment_log.log";
var http = require("http").createServer(app);
var io = require("socket.io")(http);
io.sockets.on("8080", function(socket){
	console.log("we are connected")
});

// create our app
var app = express();

// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser());


app.get("/log/app-fabric", function(req, res){
	res.set("Content-Type","application/log");
    res.sendfile('deployment_log.log');
});

app.use(function(req,res,next) {
   log.appendFile(logfile, "getFormData:REQ BODY IS:", +req.body, function(error){
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