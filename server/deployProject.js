var path = require('path');

<<<<<<< HEAD
var deployProject = function(currentDirectoryPath) {

      const spawn = require('child_process').spawn;
      
      console.log("looking for docker file in ",currentDirectoryPath);
=======
var deployProject = function(parentDir) {

      const spawn = require('child_process').spawn;

      console.log(parentDir);
>>>>>>> 3d457fb8f984379c9564b02782ad502662d7cf2a

      var dockerComposeCommand = spawn('docker-compose', ['up','-d'], {cwd : currentDirectoryPath});
        
      dockerComposeCommand.stdout.on('data', (data)=>{
        console.log(`stdout:${data}`);
      }); 
      dockerComposeCommand.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });

      dockerComposeCommand.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
        
  }

module.exports = deployProject;