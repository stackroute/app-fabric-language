const spawn = require('child_process').spawn;
var path = require('path');
var log = require('fs');
var logfile = "./deployment_log.log";



var clone = function(gitURL,socket,gitBranch){
  
  process.env.REPO_NAME=gitURL;
  var cloneDirectoryPath = process.env.REPOSITORY_PATH;
  log.appendFile(logfile, "cloneBase:REPOSITORY_PATH is:: " +cloneDirectoryPath,function(error){
    if(error) return console.log(error);
  });
  var cloneParams = ['clone',gitURL];
  if(gitBranch) { cloneParams.push('-b'); cloneParams.push(gitBranch); }
  const gitCloneCommand = spawn('git',cloneParams, {cwd : cloneDirectoryPath}); 
  console.log("Current directory path is ", cloneDirectoryPath);
  var res = gitURL.split("/");
  var repoName = (res[res.length-1].split("."))[0];
 
  process.env.REPO_NAME=repoName;
console.log(process.env.REPO_NAME);
 
  gitCloneCommand.on("close",function(){
     const findDocker = spawn('find',['.' , '-name' , 'Dockerfile'],{cwd : cloneDirectoryPath});
     var count = 0;var location = [];
    findDocker.stdout.on('data', (data) => {
     console.log(`stdout: ${data}`);
     var locationdetails = data.toString().split('\n');
     for (var i = 0 ; i < locationdetails.length ; i++){
      if(locationdetails[i].length > 0){
        location[i] = locationdetails[i];
      }
     }     
     console.log('location:', location);
     // socket.emit("location",location);

    });
  });
} 

module.exports = clone; 
