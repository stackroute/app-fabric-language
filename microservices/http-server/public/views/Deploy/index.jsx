import React from 'react';
import NavBar from '../../components/NavBar';
import DeployBot from '../../components/DeployBot';
import Paper from 'material-ui/Paper';

const styles = {
  paper: {
    height: '150px',
    padding: '40px',
    backgroundColor: '#ffb3ec'
  },
  deployBot: {
    width: '300px',
    margin: 'auto'
  }
}

export default class Deploy extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Paper style={styles.paper}>
          <h1>Deploy Application</h1>
        </Paper>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <DeployBot />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
