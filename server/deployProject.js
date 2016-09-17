var path = require('path');
var log = require('fs');
var logfile = "./deployment_log.log";

var deployProject = function(currentDirectoryPath) {
    const spawn = require('child_process').spawn;
    console.log("looking for docker file in ", currentDirectoryPath);
    var dockerComposeCommand = spawn('docker-compose', ['up', '-d'], { cwd: currentDirectoryPath });
    dockerComposeCommand.stdout.on('data', (data) => {
        log.appendFile(logfile, "deployProject:dockerComposeCommand.stdout::" + data, function(error) {
            if (error) return console.log(error);
        })
    });
    dockerComposeCommand.stderr.on('data', (data) => {
        log.appendFile(logfile, "deployProject:dockerComposeCommand.stderr::" + data, function(error) {
            if (error) return console.log(error);
        })
    });
    dockerComposeCommand.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        log.appendFile(logfile, "Closer of docker compose.", function(error) {
            if (error) return console.log(error);
        })
    });
}


module.exports = deployProject;
