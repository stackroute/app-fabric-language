const spawn = require('child_process').spawn;

//var repoURL = 'https://github.com/Ashok-Kumar-Venaktesh/Assignments.git';
var cloneGit = function(para1, callback){
	const ls = spawn('git',['clone', para1]);

	var res = para1.split("/");
	var repoName = (res[res.length-1].split("."))[0];
  	var currentDirecotryPath = __dirname+"/"+repoName;

	ls.stdout.on('data', (data) => {
	  console.log(`stdout: ${data}`);
	});

	ls.stderr.on('data', (data) => {
	  console.log(`stderr: ${data}`);
	});

	ls.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
	  callback(repoName);
	});

}

//cloneGit(repoURL, function(){console.log("Git clone successful");})
module.exports = cloneGit; 
