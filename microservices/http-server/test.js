process.env.REPOSITORY_PATH = '/tmp';
var socket = {
	emit: function(done) {
		console.log(done);
	}
}
require('./filescall')('tasker',socket);