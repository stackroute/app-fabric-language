const Router = require('express').Router();
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID || '',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
  callbackURL: 'http://localhost:3000/auth/github/complete'
}, (accessToken, refreshToken, profile, callback) => {
  callback(null, profile);
}));

Router.get('/',passport.authenticate('github'));
Router.get('/complete',passport.authenticate('github',{successRedirect: '/#/dashboard', failureRedirect: '/auth/github/fail'}));
Router.get('/fail',(req, res) => { return res.status(200).send('Failed'); });

module.exports = Router;
