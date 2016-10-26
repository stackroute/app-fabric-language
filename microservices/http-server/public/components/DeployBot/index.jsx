import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import $ from 'jquery';
import io from 'socket.io-client';
import Dialogone from './Dialog.jsx';
import SelectClass from './selectfield.jsx';
import Dependency from './Dependencies.jsx';
import ActionDone from 'material-ui/svg-icons/action/done';
import {Tabs, Tab} from 'material-ui/Tabs';
import Scroll from 'react-scroll';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

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
var docker = [];
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
      autoHideDuration: 5000,
      dockerlist: []
    }
  }
  handleTextSave = () => {

  };
  componentWillMount() {
    $.ajax({
      url: "/api/v1/github/repos",
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log('data',data);
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
    this.setState({selectedRepository:v});
    $.ajax({
          url: 'api/v1/github/repo/'+v+'/branches',
          success: (data, status) => {
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
    });
  }

  handleBranchChange(e,i,v) {
    this.setState({selectedBranch: v});
  }

  handleselectPlatform(e,i,v){
    this.setState({selectedPlatform:v});
  }

  handleRequestClose = () =>{
    this.setState({
      open: false,
    });
  }

  handleRepositoryFormSubmit(e) {
    e.preventDefault();
    this.setState({repositorySubmitted:true});
    }

  handleCreateBaseImage(createBaseImage) {
    this.setState({createBaseImage: createBaseImage, displayServices: true});
  }

  handleDisplayPlatform(){
    console.log(this.state.selectedBranch);
    this.context.socket.emit('clone',{repository: this.state.selectedRepository,branch:this.state.selectedBranch});
    this.setState({displayPlatform:true,open:true,message:'Cloning Started'});
  }

  handleCheckbox(event) {
    console.log("clicked");
    console.log("Value : "+event);
    // console.log(checkedArray);
  }
  handleDisplayImages(e) {
    this.setState({displayBaseImages:true});

  }
  handleBaseImage(e,i,v) {
    this.setState({selectedBaseImage:v});

  }
  handleDisplayServices() {
    this.setState({displayConfigServices:true});
    scroll.scrollToTop();
  }
  handleDisplayConfigureService() {
    this.setState({displayWebhook:true});

  }
  handleWebhook() {
    console.log("```````````status```````````````");
    a=a.split("/");

    var pr={username: a[0],
            reponame: a[1],
            };

    // pr["Username"]=a[0];
    // pr["Repo Name"]=a[1];
    console.log(pr);
    $.ajax({
        type: 'POST',
          url: '/api/webhook',
           data: JSON.stringify(pr),
           contentType: 'application/json',
           // dataType : 'json',
          success: (data, status) => {
            console.log('----------------ajax success-----------');
          },
          error:function(err){
            console.log('----------------ajax failed------------');
          }
        });
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
    this.context.socket.on("servicelist",function(data){
      console.log('dockerlist List: ',data);
      this.setState({dockerlist:data.dockerlist,packagelist:data.packagelist});
    }.bind(this));
  }

  render() {
    const menuItems = this.state.repositoryBranches.map((branchObject) => {
      return <MenuItem value={branchObject} primaryText={branchObject} key={branchObject} />
    });

    const repositoryItem = this.state.repositories.map((repObject) => {
      return <MenuItem value={repObject} primaryText={repObject} key={repObject} />
    });

    const listLocation = this.state.dockerlist.map((locObject) => {
      return <ListItem primaryText={locObject} leftCheckbox={<Checkbox onClick={this.handleCheckbox(locObject)} />} />
    });
// primaryText={locObject} key={locObject}

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

    const scannedServices = (
      <div>
        <Paper style={styles.paper}>
          <div style={styles.content}>
            <h3>Select Custom Base Image</h3>
            <p>In case you don't know what this is, click next to continue.</p>
            <div id="checks">
              <List style={{height: '400px', overflow: 'auto'}}>
                {listLocation}
              </List>
            </div>
            <div className="end-xs">
              <FlatButton label="Next" primary={true} onTouchTap={this.handleDisplayImages.bind(this,false)} />
            </div>
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
                {/*<TableRowColumn><Dialogone data={checkedArray}/></TableRowColumn>*/}
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
                {/*<TableRowColumn><Dialogone data={checkedArray}/></TableRowColumn>*/}
              </TableRow>
              <TableRow>
                <TableRowColumn>4</TableRowColumn>
                <TableRowColumn>Service4</TableRowColumn>
                <TableRowColumn><CircularProgress/>Scanning</TableRowColumn>
                {/*<TableRowColumn><Dialogone data={checkedArray}/></TableRowColumn>*/}
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
                <FlatButton label = "OK" primary={true} onTouchTap={this.handleWebhook.bind(this)}/>
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
        { this.state.displayBaseImages ? seviceComponent : null }
        { this.state.displayPlatform ? scannedServices : null }
        { this.state.repositorySubmitted ? selectPlatform : null }
        { selectRepositoryComponent }
      </div>
    );
  }
}
