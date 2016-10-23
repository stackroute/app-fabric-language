const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sessionSecret = process.env.SESSION_SECRET || 'abaeuthateuhuiharp';
const app = express();
const repo = require('./public/getRepos.js');
const branches = require ('./public/getBranches.js');
const passport = require('passport');
const path = require('path');

// require('./db');

// const cache = {'6926535': {"id":"6926535","displayName":"Sagar Patke","username":"sagarpatke","profileUrl":"https://github.com/sagarpatke","photos":[{"value":"https://avatars.githubusercontent.com/u/6926535?v=3"}],"provider":"github","_raw":"{\"login\":\"sagarpatke\",\"id\":6926535,\"avatar_url\":\"https://avatars.githubusercontent.com/u/6926535?v=3\",\"gravatar_id\":\"\",\"url\":\"https://api.github.com/users/sagarpatke\",\"html_url\":\"https://github.com/sagarpatke\",\"followers_url\":\"https://api.github.com/users/sagarpatke/followers\",\"following_url\":\"https://api.github.com/users/sagarpatke/following{/other_user}\",\"gists_url\":\"https://api.github.com/users/sagarpatke/gists{/gist_id}\",\"starred_url\":\"https://api.github.com/users/sagarpatke/starred{/owner}{/repo}\",\"subscriptions_url\":\"https://api.github.com/users/sagarpatke/subscriptions\",\"organizations_url\":\"https://api.github.com/users/sagarpatke/orgs\",\"repos_url\":\"https://api.github.com/users/sagarpatke/repos\",\"events_url\":\"https://api.github.com/users/sagarpatke/events{/privacy}\",\"received_events_url\":\"https://api.github.com/users/sagarpatke/received_events\",\"type\":\"User\",\"site_admin\":false,\"name\":\"Sagar Patke\",\"company\":\"CGHR\",\"blog\":\"http://www.cghr.org/\",\"location\":\"Bangalore, India\",\"email\":null,\"hireable\":null,\"bio\":null,\"public_repos\":18,\"public_gists\":0,\"followers\":4,\"following\":0,\"created_at\":\"2014-03-12T06:25:26Z\",\"updated_at\":\"2016-09-24T08:28:21Z\"}","_json":{"login":"sagarpatke","id":6926535,"avatar_url":"https://avatars.githubusercontent.com/u/6926535?v=3","gravatar_id":"","url":"https://api.github.com/users/sagarpatke","html_url":"https://github.com/sagarpatke","followers_url":"https://api.github.com/users/sagarpatke/followers","following_url":"https://api.github.com/users/sagarpatke/following{/other_user}","gists_url":"https://api.github.com/users/sagarpatke/gists{/gist_id}","starred_url":"https://api.github.com/users/sagarpatke/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/sagarpatke/subscriptions","organizations_url":"https://api.github.com/users/sagarpatke/orgs","repos_url":"https://api.github.com/users/sagarpatke/repos","events_url":"https://api.github.com/users/sagarpatke/events{/privacy}","received_events_url":"https://api.github.com/users/sagarpatke/received_events","type":"User","site_admin":false,"name":"Sagar Patke","company":"CGHR","blog":"http://www.cghr.org/","location":"Bangalore, India","email":null,"hireable":null,"bio":null,"public_repos":18,"public_gists":0,"followers":4,"following":0,"created_at":"2014-03-12T06:25:26Z","updated_at":"2016-09-24T08:28:21Z"}}};
const cache = {};
passport.serializeUser((user, done) => {
  cache[user.id] = user;
  done(null, user.id);
  console.log(user.accessToken);
});

passport.deserializeUser((id, done) => {
  done(null, cache[id]);
});

app.use(cookieParser());
app.use(express.static(path.resolve(__dirname,'public')));
app.use(session({secret: sessionSecret}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./api/router'));
app.get('/me',(req, res) => {
  if(req.user) { return res.send(req.user);
 }
  return res.status(401).json({});
});
app.get('/repos', function(req, res)  {
	var token = req.user.accessToken;
	repo(token, function(err, repos) {
	res.send(repos);
	// console.log(repos);
	console.log(process.env.REPOSITORY_PATH);
	});	
});

app.get('/branches', function(req, res)  {
	var fullname = req.query.a;
	branches( fullname,function(err, branch) {
		res.send(branch);
		// console.log(branch);
	});
});

app.get('/logout',(req, res) => {
  if(req.user) { req.logout(); }
  res.status(200).send();
});

module.exports = app;
