import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Router,Route,hashHistory} from 'react-router';

import Home from './views/Home';
import Dashboard from './views/Dashboard';
import Deploy from './views/Deploy';

import $ from 'jquery';

ReactDOM.render(
  <MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path="/" component={Home} onEnter={skipIfLoggedIn} />
      <Route path="/dashboard" component={Dashboard} onEnter={requiresAuthentication} />
      <Route path="/deploy" component={Deploy} onEnter={requiresAuthentication} />
    </Router>
  </MuiThemeProvider>, document.getElementById('content'));

function skipIfLoggedIn(nextState,replace,next) {
  if(localStorage.me) {
    replace('/dashboard');
    return next();
  }
  next();
}

function requiresAuthentication(nextState,replace,next) {
  if(localStorage.me) {
    return next();
  }
  $.ajax({
    method: 'GET',
    url: '/me',
    contentType: 'application/json',
    success: (data, status) => {
      localStorage.me = data;
      next();
    },
    error: (data, status) => {
      replace('/');
      next();
    }
  });
}
