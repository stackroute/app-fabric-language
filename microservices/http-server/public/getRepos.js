var request=require('request');


module.exports = function Repos(token, callback) {
	console.log("got tocken "+token );
	var options = {
		url:"https://api.github.com/user/repos?access_token="+token,
		headers:{
			'User-Agent': 'request'
		}

	};
	function callbacks(err,res,body){
		if(err){
			return callback(err);
		}
		callback(null,body);
		// console.log(body);

	}

	request(options, callbacks);
}
