var path = require('path');
const spawn = require('child_process').spawn;

var cloneGit = function(gitURL, dockerComposeCommand){
	const gitCloneCommand = spawn('git',['clone', gitURL]);

	var res = gitURL.split("/");
	var repoName = (res[res.length-1].split("."))[0];
  	var currentDirecotryPath = path.resolve(process.env.REPOSITORY_PATH+"/"+repoName);

	gitCloneCommand.stdout.on('data', (data) => {
	  console.log(`stdout: ${data}`);
	});

	gitCloneCommand.stderr.on('data', (data) => {
	  console.log(`stderr: ${data}`);
	});

	gitCloneCommand.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
	  dockerComposeCommand(currentDirecotryPath);
	});

}

module.exports = cloneGit; 