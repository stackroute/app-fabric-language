import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import restUrl from '../../restUrl';

const styles = {
  textAlign: 'center',
  marginTop: '200px'
}

export default class Home extends React.Component {
  render() {
    return (
      <div style={styles}>
        <p>Host your docker-compose applications in few steps</p>
        <p><a href={restUrl + 'auth/github'}><FlatButton label="Login with Github to continue" /></a></p>
      </div>
    );
  }
}
