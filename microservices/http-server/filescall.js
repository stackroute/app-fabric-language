const spawn = require('child_process').spawn;
var seneca  = require('seneca');
module.exports = function(reponame, socket) {
 	 const docker = "/Dockerfile";
 	 const dockerCompose = "/docker-compose.yml";

 	 const copyfiles = spwan('cp', ['/tmp/files/*', process.env.REPOSITORY_PATH + '/' + reponame] );
 	 copyfiles.on('close', function() {
 	 	const up = spawn('docker-compose',['up','-d','--build'],{cwd: process.env.REPOSITORY_PATH + '/' + reponame});
	 	up.on('close', function() {
	 		socket.emit('done');
	 	});
 	 });
};