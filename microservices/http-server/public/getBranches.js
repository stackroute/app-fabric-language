var request=require('request');


module.exports = function Repos(repository, token, callback) {
	var options = {
		url:"https://api.github.com/repos/"+repository+"/branches?access_token="+token,
		headers:{
			'User-Agent': 'request'
		}

	};
	function callbacks(err,res,body){
		if(err){
			return callback(err);
		}
		callback(null,body);
	}

	request(options, callbacks);
}