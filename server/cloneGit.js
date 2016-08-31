const spawn = require('child_process').spawn;

var cloneGit = function(gitURL, dockerComposeCommand){
	const gitCloneCommand = spawn('git',['clone', gitURL]);

	var res = gitURL.split("/");
	var repoName = (res[res.length-1].split("."))[0];
  	var currentDirecotryPath = __dirname+"/"+repoName;

	gitCloneCommand.stdout.on('data', (data) => {
	  console.log(`stdout: ${data}`);
	});

	gitCloneCommand.stderr.on('data', (data) => {
	  console.log(`stderr: ${data}`);
	});

	gitCloneCommand.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
	  dockerComposeCommand(repoName);
	});

}

module.exports = cloneGit; 