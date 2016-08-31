var path = require('path');

var deployProject = function(repoName) {

      const spawn = require('child_process').spawn;
      var parentDir = path.resolve(__dirname, repoName);
      console.log(parentDir);

      var dockerComposeCommand = spawn('docker-compose', ['up','-d'], {cwd : parentDir});
        
      dockerComposeCommand.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      }); 
      dockerComposeCommand.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });

      dockerComposeCommand.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });  
    
    
  }

module.exports = deployProject;