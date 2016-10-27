const Router = require('express').Router();
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID || '8898694b657fb8ebe52f',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || '63ed3e18215337068b08247b0b785b47946e8cb4',
  callbackURL: 'http://appfabric.stackroute.in/auth/github/complete'
}, (accessToken, refreshToken, profile, callback) => {
  profile.accessToken = accessToken;
  callback(null, profile);
  
}));

Router.get('/',passport.authenticate('github',{scope: ['admin:repo_hook', 'public_repo']}));
Router.get('/complete',passport.authenticate('github',{successRedirect: '/#/dashboard', failureRedirect: '/auth/github/fail'}));
Router.get('/fail',(req, res) => { return res.status(200).send('Failed'); });

module.exports = Router;
