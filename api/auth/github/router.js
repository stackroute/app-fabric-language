const Router = require('express').Router();
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID || '75e41dfa12a8787c1c79',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || 'b3ddef9b837aee5f5ac40c6ca8f0fdc14f49a8d6',
  callbackURL: 'http://localhost:3000/auth/github/complete'
}, (accessToken, refreshToken, profile, callback) => {
  callback(null, profile);
}));

Router.get('/',passport.authenticate('github'));
Router.get('/complete',passport.authenticate('github',{successRedirect: '/#/dashboard', failureRedirect: '/auth/github/fail'}));
Router.get('/fail',(req, res) => { return res.status(200).send('Failed'); });

module.exports = Router;
