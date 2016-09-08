const spawn = require('child_process').spawn;
var path = require('path');
var log = require('fs');
var logfile = "./deployment_log.log";

var cloneGit = function(gitURL, dockerComposeCommand){
	var cloneDirectoryPath = process.env.REPOSITORY_PATH;
	log.appendFile(logfile, 'CloneGit:REPOSITORY_PATH is:: ' +cloneDirectoryPath, function(error){
		   if (error) return console.log(error);
		});

	const gitCloneCommand = spawn('git',['clone', gitURL], {cwd : cloneDirectoryPath});

	
  	console.log("Current directory path is ", cloneDirectoryPath);


	var res = gitURL.split("/");
	var repoName = (res[res.length-1].split("."))[0];
  	
	gitCloneCommand.stdout.on('data', (data) => {
    log.appendFile(logfile, 'CloneGit:Git clone from stdout:: '+data, function(error){
		   if (error) return console.log(error);
		});
	});

	gitCloneCommand.stderr.on('data', (data) => {
    log.appendFile(logfile, 'CloneGit:Git clone from stderr:: '+data, function(error){
	   if (error) return console.log(error);
	  });
	});

	gitCloneCommand.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
  	  log.appendFile(logfile, "CloneGit:Done git clone\n", function(error){
	   if (error) return console.log(error);
	   console.log('CloneGit:Done git clone > logfile');
	  });	  
	  dockerComposeCommand(path.resolve(cloneDirectoryPath,repoName));
	});

}

module.exports = cloneGit; 