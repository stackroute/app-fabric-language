import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import $ from 'jquery';

export default class NavBar extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    }
  }
  handleLogout() {
    $.ajax({
      url: '/logout',
      contentType: 'text/plain',
      success: (data, status) => {
        delete localStorage.me;
        this.context.router.push('/');
      }
    });
  }
  render() {
    return (
      <AppBar title="App Fabric"
        iconElementRight={<IconButton><ActionExitToApp /></IconButton>}
        onRightIconButtonTouchTap={this.handleLogout.bind(this)}
      />
    );
  }
}
