import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import $ from 'jquery';
import io from 'socket.io-client';
import Dialogone from './Dialog.jsx';
import SelectClass from './selectfield.jsx';
import Dependency from './Dependencies.jsx'
import ActionDone from 'material-ui/svg-icons/action/done';
import {Tabs, Tab} from 'material-ui/Tabs';
import Scroll from 'react-scroll';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


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
var timein;
var scroll= Scroll.animateScroll;
var a;

export default class DeployBot extends React.Component {
  constructor() {
    super();
    this.state = {
      repositoryUrl: "",
      repositories: [],
      repositoryBranches: [],
      selectedBranch: null,
      selectedRepository: null,
      selectedPlatform: null,
      repositorySubmitted: false,
      open: false,
      autoHideDuration: 5000
    }
  }
  handleTextSave = () => {

  };
  componentWillMount() {
    $.ajax({
      url: "/repos",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({repositories: data});
      }.bind(this),
      error: function(data,status) {
        this.setState({repositories: [], selectedRepository: null});
      }.bind(this)
    });
  }
  handleRepositoryChange(e) {
    if(timeout) { clearTimeout(timeout); }
    const newRepositoryValue = e.target.value;
    this.setState({ repositoryUrl: newRepositoryValue });
    timeout = setTimeout(this.fetchRepository.bind(this,newRepositoryValue),100);
    timeout = setTimeout(this.fetchRepositoryBranches.bind(this,newRepositoryValue),500);
  }

  fetchRepositoryBranches(repositoryUrl) {
    console.log()
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
  
  handleRepository(e,i,v) {
    // var a;
    this.setState({selectedRepository:v});
   var ownerName=this.state.repositories.map(function(data) {
      if(data.name == v){
        a=data.full_name;
          console.log(a);
        }
      
    });
    $.ajax({
          url: '/branches',
           data: {a},
           dataType : 'json',
          success: (data, status) => {
            console.log("branchData"+data);
            this.setState({repositoryBranches: data});
          },
          error: (data, status) => {
            this.setState({repositoryBranches: [], selectedBranch: null});
          }
        });
    }
        
  
  
  fetchRepository(repositoryUrl) {
    const rep= repositoryUrl.split('github.com/')[1].replace('.git','');
    $.ajax({
      url : 'https://api.github.com/users/' + rep +'/repos',
      success: (data, status) => {
        this.setState({repositories:data});
      },
      error: (data, status) => {
        this.setState({repositories: [], selectedRepository: null});
      }
    })
  }


  handleBranchChange(e,i,v) {
    this.setState({selectedBranch: v});
  }

  handleselectPlatform(e,i,v){
    this.setState({selectedPlatform:v});
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  handleRepositoryFormSubmit(e) {
    e.preventDefault();
    this.setState({repositorySubmitted:true});
    console.log(a);
    console.log(this.state.selectedBranch);
    this.context.socket.emit('con',{url:a,branch:this.state.selectedBranch});
  }

  handleCreateBaseImage(createBaseImage) {
    this.setState({createBaseImage: createBaseImage, displayServices: true});
  }

  handleDisplayPlatform(){
    this.setState({displayPlatform:true,open:true,message:'Cloaning Started'})
  }
  handleDisplayServices() {
    this.setState({displayConfigServices:true});
    scroll.scrollToTop();
  }
  handleDisplayConfigureService() {
    this.setState({displayWebhook:true});
  }
  handleWebhook() {
    this.setState({displayReview:true});
  }
  handleReview() {
    this.setState({displayProgress:true})
  }

  static get contextTypes(){
    return{
      router: React.PropTypes.object.isRequired,
      socket: React.PropTypes.object.isRequired
    }
  }

  componentDidMount() {
    this.setState({io: io()});

  }

  render() {

    const menuItems = this.state.repositoryBranches.map((branchObject) => {
      return <MenuItem value={branchObject.name} primaryText={branchObject.name} key={branchObject.name} />
    });

  const repositoryItem = this.state.repositories.map((repObject) => {
      return <MenuItem value={repObject.name} primaryText={repObject.name} key={repObject.name} />
    });

    const selectRepositoryComponent = (
      <div>
        <Paper style={styles.paper}>
          <form noValidate onSubmit={this.handleRepositoryFormSubmit.bind(this)}>
            <div style={styles.content}>
              <h3>Enter OR Select a github repository to deploy</h3>
              <TextField
                style={styles.textField}
                floatingLabelText="Github Repository URL"
                value={this.state.repositoryUrl}
                onChange={this.handleRepositoryChange.bind(this)} />
                <br />
                <SelectField 
                floatingLabelText="Repositories"
                onChange={this.handleRepository.bind(this)}
                value={this.state.selectedRepository}>
                {repositoryItem}
              </SelectField>
              <br />
              <SelectField
                floatingLabelText="Branch"
                onChange={this.handleBranchChange.bind(this)}
                value={this.state.selectedBranch}>
                {menuItems}
              </SelectField>
            </div>
            <div className="end-xs">
              <FlatButton type="submit" primary={true} label="Next" />
            </div>
          </form>
        </Paper>
      </div>
    );

    const selectPlatform = (
      <div>
        <Paper style={styles.paper}>
          <div style={styles.content}>
            <h3>Select on which Platform you want to Deploy.</h3>
              <SelectField
                onChange={this.handleselectPlatform.bind(this)}
                floatingLabelText="Select Platform"
                value={this.state.selectedPlatform}>
                  <MenuItem value={1} primaryText="Docker" />
                  <MenuItem value={2} primaryText="Kubernetes" />
              </SelectField>
          </div>
          <div>
          <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={this.state.autoHideDuration}
          onRequestClose={this.handleRequestClose}
        />
      </div>
          <div className="end-xs">
            <FlatButton primary={true} label="Next" onTouchTap={this.handleDisplayPlatform.bind(this,true)} />
          </div>
        </Paper>
      </div>
    );

    const createBaseImageComponent = (
      <div>
        <Paper style={styles.paper}>
          <div style={styles.content}>
            <h3>While we clone your repository, tell us if you would like to build a base image.</h3>
            <FlatButton label="Yes" primary={true} onTouchTap={this.handleCreateBaseImage.bind(this,true)} />
            <FlatButton label="No" primary={true} onTouchTap={this.handleCreateBaseImage.bind(this,false)} />
          </div>
        </Paper>
      </div>
    );

    const seviceComponent = (
      <div>
      <Paper style={styles.paper}>
        <div style={styles.content}>
        <h3>Checking for availability of Docker File </h3>
          <Table className="table-bordered">
            <TableHeader style={{paddingTop:"20px"}} adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>id</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
                <TableHeaderColumn>Info</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} style={{textAlign:"center"}}>
              <TableRow>
                <TableRowColumn>1</TableRowColumn>
                <TableRowColumn>Service1</TableRowColumn>
                <TableRowColumn><CircularProgress/>Scanning</TableRowColumn>
                <TableRowColumn><Dialogone/></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>2</TableRowColumn>
                <TableRowColumn>Service2</TableRowColumn>
                <TableRowColumn><CircularProgress/>Scanning</TableRowColumn>
                <TableRowColumn><ActionDone style={{color:"#2FAF06"}}/></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>3</TableRowColumn>
                <TableRowColumn>Service3</TableRowColumn>
                <TableRowColumn><CircularProgress/>Scanning</TableRowColumn>
                <TableRowColumn><Dialogone/></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>4</TableRowColumn>
                <TableRowColumn>Service4</TableRowColumn>
                <TableRowColumn><CircularProgress/>Scanning</TableRowColumn>
                <TableRowColumn><Dialogone/></TableRowColumn>
              </TableRow>

            </TableBody>
        </Table>
       </div>
      <div className="end-xs">
        <FlatButton label="Next" primary={true} onTouchTap={this.handleDisplayServices.bind(this,false)} />
      </div>
      </Paper>
    </div>
    );

    const configServiceComponent = (
      <div >
        <Paper style={styles.paper}>
        <div style={styles.content}>
        <h3>Need some dependencies & configurations for your services</h3>
          <Table className="table-bordered">
              <TableHeader style={{paddingTop:"20px"}} adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Available Services</TableHeaderColumn>
                  <TableHeaderColumn>Configurations</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn>Service1</TableRowColumn>
                  <TableRowColumn><Dependency /></TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Service2</TableRowColumn>
                  <TableRowColumn><Dependency /></TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Service3</TableRowColumn>
                  <TableRowColumn><Dependency /></TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Service4</TableRowColumn>
                  <TableRowColumn><Dependency /></TableRowColumn>
                </TableRow>
              </TableBody>
          </Table>
          </div>
          <div className="end-xs">
            <FlatButton label="Next" primary={true} onTouchTap={this.handleDisplayConfigureService.bind(this,false)} />
          </div>
        </Paper>

        </div>
      );

      const webhooksComponent=(
        <div>
          <Paper style={styles.paper}>
            <div style={styles.content}>
              <h3>We will configure here Web-hooks repository for you</h3>
                <FlatButton label = "OK" primary={true} onTouchTap={this.handleWebhook.bind(this,false)}/>
                <FlatButton label = "Cancel" primary={true} onTouchTap={this.handleWebhook.bind(this,false)}/>
            </div>
          </Paper>
        </div>
      );

      const reviewConfiguration = (
        <div>
          <Paper style={styles.paper}>
            <div style={styles.content}>
              <ul style={{listStyleType: "none"}}>
                <h3>Before we start deploying: </h3>
                <li>
                  Domain Name: <TextField hintText="Enter the Domain name" style={{marginLeft:"20px"}}/>
                </li>
                <li>
                  App Name: <TextField hintText="Enter the App name" style={{marginLeft:"20px"}} />
                </li>
                <li> Branch: </li>
                <li style={{marginTop:"20px"}} > Repository: </li>
              </ul>
            </div>
            <div className="end-xs">
              <FlatButton label="next" primary={true} onTouchTap={this.handleReview.bind(this,false)} />
            </div>
          </Paper>
        </div>
        );

      const progressComponent = (
      <div>
        <Paper style={styles.paper}>
          <div style={styles.content}>
            <h3>Deployment Progress</h3>
            <CircularProgress /> Creating Base Image <br />
            <CircularProgress /> Deploying <br />
          </div>
        </Paper>
      </div>
    );

    return (
      <div>

        { this.state.displayProgress ? progressComponent : null }
        { this.state.displayReview ? reviewConfiguration : null }
        { this.state.displayWebhook ? webhooksComponent : null }
        { this.state.displayConfigServices ? configServiceComponent : null }
        { this.state.displayPlatform ? seviceComponent : null }
        { this.state.repositorySubmitted ? selectPlatform : null }
        { selectRepositoryComponent }
      </div>
    );
  }
}
