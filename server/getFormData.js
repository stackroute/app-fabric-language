var express = require('express');
var path = require('path');
var cloneGit = require('./cloneGit.js');

/*
 * body-parser is a piece of express middleware that 
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body` 
 *
 * 'body-parser' must be installed (via `npm install --save body-parser`)
 * For more info see: https://github.com/expressjs/body-parser
 */
var bodyParser = require('body-parser');

// create our app
var app = express();

// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser());

// A browser's default method is 'GET', so this
// is the route that express uses when we visit
// our site initially.
app.use(express.static(__dirname + '/../client'));



// This route receives the posted form.
// As explained above, usage of 'body-parser' means
// that `req.body` will be filled in with the form elements
app.post('/deploy', function(req, res){
  var gitURL = req.body.gitURL;
  console.log("gitURL ",gitURL);

  cloneGit(gitURL, function(repoName) {

      const spawn = require('child_process').spawn;
      var path = require('path');
      var parentDir = path.resolve(__dirname, repoName);
      console.log(parentDir);

      var ls = spawn('docker-compose', ['up','-d'], {cwd : parentDir});
        
      ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      }); 
      ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });

      ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });  
    
  	
  });  

});

app.listen(8080);






