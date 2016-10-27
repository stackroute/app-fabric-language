const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
var seneca  = require('seneca');
module.exports = function(reponame, socket) {
 	 const docker = "/Dockerfile";
 	 const dockerCompose = "/docker-compose.yml";
 	 const from = '/tmp/files/Dockerfile';
 	 const to = process.env.REPOSITORY_PATH + '/' + reponame;
 	 console.log('from',from);
 	 console.log('to',to);
 	 spawn('cp', [from, to + '/Dockerfile'] ).on('close', function(code) {
 	 	console.log('Dockerfile Code',code);
 	 	spawn('cp', ['/tmp/files/docker-compose.yml', to + '/docker-compose.yml']).on('close', function(code1) {
 	 		console.log('docker-compose.yml',code1);
 	 		var s = spawn('docker-compose', ['up','-d','--build'],{cwd:to}).on('close', function(code2) {
 	 			console.log('docker-compose up',code2);
 	 			socket.emit('done');
 	 		})
 	 		s.stdout.on('data', function(data) {
 	 			console.log('stdout',data.toString());
 	 		});
 	 		s.stderr.on('data', function(data) {
 	 			console.log('stderr',data.toString());
 	 		});
 	 	});
 	 });
 	 // exec('docker-compose', ['up','-d','--build'],{cwd:to});
 	 /*copyfiles.on('close', function(status) {
 	 	console.log('status',status);
 	 	const copyfiles1 = spawn('cp',['/tmp/files/docker-compose.yml',to + '/docker-compose.yml']);
 	 	const up = spawn('docker-compose',['up','-d','--build'],{cwd: process.env.REPOSITORY_PATH + '/' + reponame});
	 	up.on('close', function() {
	 		socket.emit('done');
	 	});
 	 });*/
};