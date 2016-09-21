const spawn = require('child_process').spawn;
var path = require('path');
var log = require('fs');
var logfile = "./deployment_log.log";


var deployBase = function(imageName,dockerComposeCommand,locationName,socket){
	var cloneDirectoryPath = process.env.REPOSITORY_PATH;
	var location = locationName.split('/');
	location.pop();
	var myBaseLocation="";
	var finalLocation = location.map(function(concat){
		myBaseLocation +=concat + "/";
	});
	var repoName = location[1];
	console.log("repository at deploy base is ",repoName);

	const deployBaseCommand = spawn('docker',['build','-t',imageName,myBaseLocation],
		{cwd : cloneDirectoryPath });
	  deployBaseCommand.stdout.on('data', (data)=>{ 
	  	socket.emit("base",{isComplete: false, isInProgress: true});
   	 	log.appendFile(logfile, "deployProject:deployBaseCommand.stdout::" +data, function(error){
     	if (error) return console.log(error);
   })

  });


  deployBaseCommand.stderr.on('data', (data) => {
    log.appendFile(logfile, "deployProject:deployBaseCommand.stderr::" +data, function(error){
     if (error) return console.log(error);
   }) 

  });

  deployBaseCommand.on('close', (code) => {  
    console.log(`child process exited with code ${code}`);
    socket.emit("clone",{isComplete: true,isInProgress: false});
    socket.emit("base",{isComplete: true,isInProgress: false});
    log.appendFile(logfile, "Closer of docker compose.", function(error){
     if (error) return console.log(error);
   })
   dockerComposeCommand(path.resolve(cloneDirectoryPath,repoName),socket);
  });

}

//module.exports = deployBase; 