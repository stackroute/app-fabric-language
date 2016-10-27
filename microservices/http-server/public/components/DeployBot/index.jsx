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
	},
  customWidth: {
    width: '550px'
  }
}

var finalServiceObject={};
var finalConfigObj={};
var osNames={};        //os names


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
			dockerlist: [],
			packagelist: [],
			selectedOs: '',
			done:false
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

	handlestartCloning(e,i,v){
		this.setState({startCloning:v});
	}

	handleRequestClose = () =>{
		this.setState({
			open: false,
		});
	}

	handleRepositoryFormSubmit(e) {
		e.preventDefault();
		if(this.state.selectedBranch == null){
			this.setState({repositorySubmitted:false});
		}
		else{
			this.setState({repositorySubmitted:true});
		}
		}

	handleCreateBaseImage(createBaseImage) {
		this.setState({createBaseImage: createBaseImage, displayServices: true});
	}

	componentDidMount() {
		this.setState({io: io()});
		this.context.socket.on("servicelist",function(data){
			console.log('dockerlist List: ',data);
			this.setState({dockerlist:data.dockerlist,packagelist:data.packagelist});
		}.bind(this));
	}

	handleDisplayPlatform(){
		if(this.state.selectedPlatform == null){
			this.setState({displayPlatform:false});
		}
		else{
		console.log(this.state.selectedBranch);
		console.log(this.state.dockerlist);
		this.context.socket.emit('clone',{repository: this.state.selectedRepository,branch:this.state.selectedBranch});
		if(this.state.dockerlist.length < 1){
			this.setState({displayPlatform:false});
			this.setState({displayBaseImages:true});
		}
		else{
		this.setState({displayPlatform:true});
	}
}
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
		// $.ajax({
		// 	type: 'POST',
		// 	url: '/api/webhook',
		// 	data: JSON.stringify(pr),
		// 	contentType: 'application/json',
		// 			 // dataType : 'json',
		// 			 success: (data, status) => {
		// 				console.log('----------------ajax success-----------');
		// 			},
		// 			error:function(err){
		// 				console.log('----------------ajax failed------------');
		// 			}
		// 		});
		this.setState({displayReview:true});
	}
	handleReview() {
		this.setState({displayProgress:true});
		var data=finalServiceObject;
		console.log("Data JSON" + data);
		console.log("finalServiceObject" + this.finalServiceObject);
		console.log('SENDING:',data);
		this.context.socket.emit('deploy',data);

	}

	static get contextTypes(){
		return{
			router: React.PropTypes.object.isRequired,
			socket: React.PropTypes.object.isRequired
		}
	}

	handleDropdown = (os,serviceName) =>{
		osNames[serviceName]=os;
	}


	handleConfiguration = (configuration) =>{
	 
		for(var key in osNames)
		{
		finalServiceObject["name"]=key;
		finalServiceObject["from"]=osNames[key];
		}
		finalServiceObject["config"]=configuration;
		console.log(JSON.stringify(finalServiceObject));
	}

	componentDidMount() {
		this.setState({io: io()});
		this.context.socket.on("servicelist",function(data){
			console.log('dockerlist List: ',data);
			this.setState({dockerlist:data.dockerlist,packagelist:data.packagelist});
		}.bind(this));
		this.context.socket.on("done",function(data){
			this.setState({done:true});
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

		var packageList = this.state.packagelist.map((locObject) => {
			return<TableRow>
			<TableRowColumn>{locObject}</TableRowColumn>
			<TableRowColumn><Dialogone service={locObject} data={this.handleDropdown}/></TableRowColumn>
			<TableRowColumn><Dependency data={this.handleConfiguration}/></TableRowColumn>
			</TableRow>
		});

// primaryText={locObject} key={locObject}
const selectRepositoryComponent = (
	<div>
	<Paper style={styles.paper}>
	<form noValidate onSubmit={this.handleRepositoryFormSubmit.bind(this)}>
	<div style={styles.content}>
	<h3>Select a github repository to deploy</h3>
	<SelectField
	floatingLabelText="Repositories"
	onChange={this.handleRepository.bind(this)}
  style={styles.customWidth}
	value={this.state.selectedRepository}>
	{repositoryItem}
	</SelectField>
	<br />
	<SelectField
	floatingLabelText="Branch"
	onChange={this.handleBranchChange.bind(this)}
  style={styles.customWidth}
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
	</SelectField>
	</div>
	<div className="end-xs">
	<FlatButton primary={true} label="Next" onTouchTap={this.handleDisplayPlatform.bind(this,true)} />
	</div>
	</Paper>
	</div>
	);

const startCloning = (
	<div>
	<Paper style={styles.paper}>
	<div style={styles.content}>
	<CircularProgress size={70} thickness={7}/>Cloning is in progress
	</div>
	<div className="end-xs">
	<FlatButton primary={true} label="Next" onTouchTap={this.handlestartCloning.bind(this,true)} />
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
 <TableHeaderColumn>Service</TableHeaderColumn>
 <TableHeaderColumn>Select OS</TableHeaderColumn>
	<TableHeaderColumn>Configurations</TableHeaderColumn>
 
 </TableRow>
 </TableHeader>
 <TableBody displayRowCheckbox={false} style={{textAlign:"center"}}>
 {packageList} 
 </TableBody>
 </Table>
 </div>
 <div className="end-xs">
 <FlatButton label="Next" primary={true} onTouchTap={this.handleDisplayServices.bind(this,false)} />
 </div>
 </Paper>
 </div>
 );

/*const configServiceComponent = (
	<div >
	<Paper style={styles.paper}>
	<div style={styles.content}>
	<h3>Need some dependencies & configurations for your services</h3>
	<Table className="table-bordered">
	<TableHeader style={{paddingTop:"20px"}} adjustForCheckbox={false} displaySelectAll={false}>
	<TableRow>
	<TableHeaderColumn>Available Services</TableHeaderColumn>
	</TableRow>
	</TableHeader>
	<TableBody displayRowCheckbox={false}>
	</TableBody>
	</Table>
	</div>
	<div className="end-xs">
	<FlatButton label="Next" primary={true} onTouchTap={this.handleDisplayConfigureService.bind(this,false)} />
	</div>
	</Paper>

	</div>
	);
*/
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
	<li> Branch: {this.state.selectedBranch}</li>

	<li style={{marginTop:"20px"}} > Repository: {this.state.selectedRepository}</li>
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
	{!this.state.done ? <CircularProgress /> : <ActionDone style={{color:"#2FAF06"}}/> } Deploying <br />
	{!this.state.done ? <CircularProgress /> : <ActionDone style={{color:"#2FAF06"}}/> } DNS Configuration <br />
	</div>
	</Paper>
	</div>
	);

return (
	<div>

	{ this.state.displayProgress ? progressComponent : null }
	{ this.state.displayReview ? reviewConfiguration : null }
	{ this.state.displayWebhook ? webhooksComponent : null }
	{ this.state.displayConfigServices ? webhooksComponent : null }
	{ this.state.displayBaseImages ? seviceComponent : null }
	{ this.state.displayPlatform ? scannedServices : null }
	{ this.state.startCloning ? scannedServices : null }
	{ this.state.repositorySubmitted ? selectPlatform : null }
	{ selectRepositoryComponent }
	</div>
	);
}
}
