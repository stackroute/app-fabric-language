var path = require('path');
const spawn = require('child_process').spawn;

var path = require('path');

var cloneGit = function(gitURL, dockerComposeCommand){
	
	var cloneDirectoryPath = process.env.REPOSITORY_PATH;
	console.log("REPOSITORY_PATH is", cloneDirectoryPath);

	const gitCloneCommand = spawn('git',['clone', gitURL], {cwd : cloneDirectoryPath});

	
  	console.log("Current directory path is ", cloneDirectoryPath);

	var res = gitURL.split("/");
	var repoName = (res[res.length-1].split("."))[0];
<<<<<<< HEAD
  	
=======
  	var currentDirecotryPath = path.resolve(process.env.REPOSITORY_PATH+"/"+repoName);

>>>>>>> 3d457fb8f984379c9564b02782ad502662d7cf2a
	gitCloneCommand.stdout.on('data', (data) => {
	  console.log(`stdout: ${data}`);
	});

	gitCloneCommand.stderr.on('data', (data) => {
	  console.log(`stderr: ${data}`);
	});

	gitCloneCommand.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
<<<<<<< HEAD
	  dockerComposeCommand(path.resolve(cloneDirectoryPath,repoName));
=======
	  dockerComposeCommand(currentDirecotryPath);
>>>>>>> 3d457fb8f984379c9564b02782ad502662d7cf2a
	});

}

module.exports = cloneGit; 