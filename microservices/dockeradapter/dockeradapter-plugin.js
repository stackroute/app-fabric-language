
module.exports = function(option) {
  const spawn = require('child_process').spawn;
  var path = require('path');
  var log = require('fs');
  var seneca = require('seneca');

  this.add('role:dockeradapter,cmd:findservices',function(msg, respond) {
    const cloneDirectoryPath = msg.directoryPath;
    console.log("------------------------------");
    console.log("------------------------------");
    console.log("from dockeradapter"+cloneDirectoryPath);
    const findDocker = spawn('find',['.' , '-name' , 'Dockerfile'],{cwd: cloneDirectoryPath});
    const findPackage = spawn('find',['.', '-name','package.json'],{cwd: cloneDirectoryPath});
    var count = 0;
    var location = [];
    const response = {
      dockerlist: [],
      packagelist: []
    };
    var dockerClosed = false;
    findDocker.stdout.on('data', (data) => {
      data.toString().split('\n').forEach(function(line) {
        response.dockerlist.push(line.trim());
      });
    });
    findDocker.on('close', function(code) {
      dockerClosed = true;
      sendResponse();
    });

    var packageClosed = false;
    findPackage.stdout.on('data',(data) => {
      data.toString().split('\n').forEach(function(line) {
        response.packagelist.push(line.trim());
      });
    });
    findPackage.on('close', function(data) {
      packageClosed = true;
      sendResponse();
    });

    function sendResponse() {
      if(dockerClosed && packageClosed) {
        return respond(null, response);
      }
    }
  });
};
