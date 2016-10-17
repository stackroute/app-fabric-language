import React from 'react';
import NavBar from '../../components/NavBar';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add'
import {Link} from 'react-router';

const styles = {
  paper: {
    height: '150px',
    padding: '30px',
    backgroundColor: '#90C3D4'
  },
  floatingActionButton: {
    position: 'absolute',
    left: '50px',
    marginTop: '-28px'
  }
}

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Paper zDepth={1} style={styles.paper}>
          <h1>Applications</h1>
        </Paper>
        <div style={styles.floatingActionButton}>
          <Link to="/deploy">
            <FloatingActionButton zDepth={3}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>
        </div>
      </div>
    );
  }
}
