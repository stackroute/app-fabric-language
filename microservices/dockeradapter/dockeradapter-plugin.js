
module.exports = function(option) {
  const spawn = require('child_process').spawn;
  var path = require('path');
  var log = require('fs');
  var seneca = require('seneca');

  this.add('role:dockeradapter,cmd:finddocker',function(msg, respond) {
  const cloneDirectoryPath = msg.directoryPath;
  console.log("------------------------------");
  console.log("------------------------------");
  console.log("from dockeradapter"+cloneDirectoryPath);
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
     respond(null, {baseImagePaths: location});
     
    });
  });
});
}