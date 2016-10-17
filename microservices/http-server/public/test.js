var getRepos = require('./getRepos');
var token="ede2981f6e213e597232d91c37c32ca58c339b22";

getRepos(token, function(err,users){
	console.log(users);
});

// module.exports = function getR(token, function(getR){
// 	if(err){
// 		console.log("eror",err);
// 	}
// 	console.log("getRepository");

