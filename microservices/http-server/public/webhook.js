var request = require("request");

module.exports = function webhook(username,reponame,accesstoken, callback) {

var options = { method: 'POST',
  url: 'https://api.github.com/repos/'+ username +'/'+reponame+'/hooks',
  qs: { 
  	access_token: accesstoken },
  headers: 
   { 'User-Agent': 'request',
     'cache-control': 'no-cache' },
  body: {
  	url: "http://192.168.99.100:3000/api/apps/"+username+'/'+reponame } 
  };
  function callbacks(err,res,body){
		if(err){
			return callback(err);
		}
		callback(null,body);
	}

request(options, callbacks);

  console.log(body);


}