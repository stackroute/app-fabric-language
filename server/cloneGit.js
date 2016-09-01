const spawn = require('child_process').spawn;

var path = require('path');

var cloneGit = function(gitURL, dockerComposeCommand){
	
	var cloneDirectoryPath = process.env.REPOSITORY_PATH;
	console.log("REPOSITORY_PATH is", cloneDirectoryPath);

	const gitCloneCommand = spawn('git',['clone', gitURL], {cwd : cloneDirectoryPath});

	
  	console.log("Current directory path is ", cloneDirectoryPath);

	var res = gitURL.split("/");
	var repoName = (res[res.length-1].split("."))[0];
  	
	gitCloneCommand.stdout.on('data', (data) => {
	  console.log(`stdout: ${data}`);
	});

	gitCloneCommand.stderr.on('data', (data) => {
	  console.log(`stderr: ${data}`);
	});

	gitCloneCommand.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
	  dockerComposeCommand(path.resolve(cloneDirectoryPath,repoName));
	});

}

module.exports = cloneGit; 