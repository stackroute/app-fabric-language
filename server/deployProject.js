var path = require('path');
var log = require('fs');

var deployProject = function(currentDirectoryPath) {

      const spawn = require('child_process').spawn;
      
      console.log("looking for docker file in ",currentDirectoryPath);

      var dockerComposeCommand = spawn('docker-compose', ['up','-d'], {cwd : currentDirectoryPath});
        
      dockerComposeCommand.stdout.on('data', (data)=>{
        console.log(`stdout:${data}`);
         log.appendFile("./deployment_log.txt", data, function(error){
         if (error) return console.log(error);
         console.log("error in appending logs.");
       })
      }); 
      dockerComposeCommand.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
         log.appendFile("./deployment_log.txt", data, function(error){
         if (error) return console.log(error);
         console.log("error in appending logs.");
       })       
      });

      dockerComposeCommand.on('close', (code) => {  
        console.log(`child process exited with code ${code}`);
         log.appendFile("./deployment_log.txt", "closer of docker compose", function(error){
         if (error) return console.log(error);
         console.log("error in closer of docker compose.");
       })        
      });
        
  }

module.exports = deployProject;