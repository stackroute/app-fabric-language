import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import io from 'socket.io-client';

const styles = {
  paper: {
    width: '100%',
    marginBottom: '25px'
  },
  textField: {
    width: '100%'
  },
  content: {
    padding: '50px'
  }
}

var timeout;

export default class DeployBot extends React.Component {
  constructor() {
    super();
    this.state = {
      repositoryUrl: "",
      repositoryBranches: [],
      selectedBranch: null,
      repositorySubmitted: false
    }
  }

  handleRepositoryChange(e) {
    if(timeout) { clearTimeout(timeout); }
    const newRepositoryValue = e.target.value;
    this.setState({ repositoryUrl: newRepositoryValue });
    timeout = setTimeout(this.fetchRepositoryBranches.bind(this,newRepositoryValue),500);
  }

  fetchRepositoryBranches(repositoryUrl) {
    const repositoryId = repositoryUrl.split('github.com/')[1].replace('.git','');
    $.ajax({
      url: 'https://api.github.com/repos/' + repositoryId + '/branches',
      success: (data, status) => {
        this.setState({repositoryBranches: data});
      },
      error: (data, status) => {
        this.setState({repositoryBranches: [], selectedBranch: null});
      }
    });
  }

  handleBranchChange(e,i,v) {
    this.setState({selectedBranch: v});
  }

  handleRepositoryFormSubmit(e) {
    e.preventDefault();
    this.setState({repositorySubmitted:true});
  }

  handleCreateBaseImage(createBaseImage) {
    this.setState({createBaseImage: createBaseImage});
  }

  componentDidMount() {
    this.setState({io: io()});
  }

  render() {
    const menuItems = this.state.repositoryBranches.map((branchObject) => {
      return <MenuItem value={branchObject.name} primaryText={branchObject.name} key={branchObject.name} />
    });

    const selectRepositoryComponent = (
      <div>
        <Paper style={styles.paper}>
          <form noValidate onSubmit={this.handleRepositoryFormSubmit.bind(this)}>
            <div style={styles.content}>
              <h3>Select a github repository to deploy</h3>
              <TextField
                style={styles.textField}
                floatingLabelText="Github Repository URL"
                value={this.state.repositoryUrl}
                onChange={this.handleRepositoryChange.bind(this)} />
                <br />
              <SelectField
                floatingLabelText="Branch"
                onChange={this.handleBranchChange.bind(this)}
                value={this.state.selectedBranch}>
                {menuItems}
              </SelectField>
            </div>
            <div className="end-xs">
              <FlatButton type="submit" label="Next" primary={true} />
            </div>
          </form>
        </Paper>
      </div>
    );

    const createBaseImageComponent = (
      <div>
        <Paper style={styles.paper}>
          <div style={styles.content}>
            <h3>While we clone your repository, tell us if you would like to build a base image.</h3>
            <RaisedButton label="Yes" onTouchTap={this.handleCreateBaseImage.bind(this,true)} />
            <RaisedButton label="No" onTouchTap={this.handleCreateBaseImage.bind(this,false)} />
          </div>
        </Paper>
      </div>
    );

    return (
      <div>
        { showCloningProgressComponent }
        { this.state.createBaseImae ? createBaseImageComponent : null}
        { this.state.repositorySubmitted ? createBaseImageComponent : null }
      </div>
    );
  }
}
