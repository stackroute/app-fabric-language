var path = require('path');

var deployProject = function(parentDir) {

      const spawn = require('child_process').spawn;

      console.log(parentDir);

      var dockerComposeCommand = spawn('docker-compose', ['up','-d'], {cwd : parentDir});
        
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