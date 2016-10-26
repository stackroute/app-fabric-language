module.exports = function(option) {

  const spawn = require('child_process').spawn;
  var path = require('path');
  var log = require('fs');
  var logfile = "./deployment_log.log";
  var seneca  = require('seneca');

	this.add('role:gitadapter,cmd:clone',function(msg, respond) {
    console.log('MSG: ',msg.repository);
		const repo = msg.repository;
		const branch = msg.branch;
    const user = msg.user;
    const url = "https://github.com/"+repo;
    console.log("----from gitadapter"+url);
    var cloneDirectoryPath =process.env.REPOSITORY_PATH;
    log.appendFile(logfile, "cloneBase:REPOSITORY_PATH is:: " +cloneDirectoryPath,function(error){
      if(error) return console.log(error);
    });
    var cloneParams = ['clone',url];
    if(branch) {
     cloneParams.push('-b');
     cloneParams.push(branch);
   }
   const gitCloneCommand = spawn('git',cloneParams, {cwd : cloneDirectoryPath});
   console.log("Current directory path is ", cloneDirectoryPath);
   var res = url.split("/");
   var repoName = (res[res.length-1].split("."))[0];
   console.log("----from gitadapter"+repoName);
   var link = cloneDirectoryPath+"/"+repoName;
   console.log("-------link------"+link);
   respond(null, {response:'success', repopath: link});
		// After cloning is complete, respond with success
    // console.log("from gitadapter repopath"+repopath);
	});
}
