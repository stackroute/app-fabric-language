import React from 'react';
import ReactDOM from 'react-dom';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import DeploymentCard from "./deploymentCard.jsx";
import Login from "./Login.jsx";
//App Bar 
import BaseImageCard from "./BaseImageCard.jsx";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {Router,Route,hashHistory,Link} from "react-router";
import Dropdown from 'react-dropdown';
import SelectField from 'material-ui/SelectField';
import injectTapEventPlugin from 'react-tap-event-plugin';


//Sign Out
import AppHeader from "./AppHeader.jsx";
const styles = {
  paperstyle: {
    width: "100%",
    margin: '10px',
    textAlign: 'center',
    display: 'inline-block',
    padding: '30px'
  }
};


const textStyle = {
    marginBottom : 20,
};

 const btnstyle={
    width:"80%"
 }

const muiTheme = getMuiTheme({
 palette: {
   textColor: cyan500,
 },
});

const style = {
 margin: 12,
};

var DashBoard = React.createClass({
 signOut: function(){

  document.cookie = 'JWT' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
},

   getInitialState: function() {
       return { gitRepositoryURL: '',
       gitBranchURL: '',
       clicked:false,
       noClicked:false,
       yesClicked:false,
       socket: window.io(),
       clone : {isComplete: false,isInProgress: false },
       deploy : {isComplete: false,isInProgress: false },
       branchName: [],
       cookieStatus: false,
       branchNameValue:'' };
   },

componentWillMount: function(){
  if(document.cookie){
    this.setState({cookieStatus:true})
  }
  else if(document.cookie.length == 0){
    this.setState({cookieStatus:false})
  }
},
   handleGitUrlChange: function(event) {
      console.log(event.target.value);
      var gitURL = event.target.value;
      var res = gitURL.split("/");
      var repoName = (res[res.length-1].split("."))[0];
      var projName = (res[res.length-2].split("."))[0];
      var gitBranchURL = 'https://api.github.com/repos/' + projName + '/' + repoName + '/branches'
      console.log('gitBranchURL :' +gitBranchURL);
      this.setState({gitRepositoryURL: gitURL});

      $.ajax({
       url: gitBranchURL,
       dataType: 'json',
       type: 'GET',
       }).done(function(data) {
        this.setState({branchName: data, gitRepositoryURL: gitURL});
      }.bind(this));
   },
   handlebranchChange: function(event, index, value){
      console.log('Branch name value changed');
      this.setState({branchNameValue: value});
      console.log(value)
   },
   clickedDeploy:function(){
    this.setState({clicked:true});
   },
   cloneRepositoryYes :function(e){
    e.preventDefault();
    this.setState({yesClicked:true});
    this.setState({gitRepositoryURL: ''});
    this.state.socket.emit("baseImage", {"gitURL":this.state.gitRepositoryURL} , {"gitBranch" : this.state.branchName});
    this.state.socket.on("clone",function(data){
      this.setState({clone: data});
       }.bind(this));
   },
   cloneRepository: function(e) {
       e.preventDefault();
       console.log("inside clone repo",this.state.gitRepositoryURL);
       this.setState({gitRepositoryURL: '',gitBranchURL: '',branchName: '',noClicked:true});

       this.state.socket.emit("deploy", {"gitURL":this.state.gitRepositoryURL} , {"branchName" : this.state.branchName});
       this.state.socket.on("clone",function(data){
         this.setState({clone: data});
       }.bind(this));
       this.state.socket.on("deploy",function(data){
        this.setState({deploy : data});
       }.bind(this));
   },

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentDidMount: function () {

      if (!this.state.cookieStatus){
          this.context.router.push('/')
      }
    },


render: function() {
                    console.log(this.state.branchName);
          if (this.state.branchName != ''){
            var branchItems = this.state.branchName.map(function(branch) {
              return <MenuItem value={branch.name} primaryText={branch.name}/>;
            }.bind(this));
          }

 return (
   <MuiThemeProvider muiTheme={muiTheme}>
   <div>
   <AppHeader />
   <Paper style={styles.paperstyle}>
   <form onSubmit = { this.cloneRepository } >
   <TextField
   fullWidth={true}
   type = "text"
   hintText="Enter GIT URL"
   floatingLabelText="GIT URL"
   value = { this.state.gitRepositoryURL }
   onChange = { this.handleGitUrlChange }
   name = "gitURL" style = {textStyle} />
   
                                           <SelectField 
                                               fullWidth={true} 
                                               value={this.state.branchNameValue} 
                                               onChange = {this.handlebranchChange}
                                               hintText="Select any one GIT Branch"                                                                                           
                                               maxHeight={200} >
                                                {branchItems}
                                            </SelectField> 

   <RaisedButton label="Primary" primary={true} style={btnstyle} label="Deploy" secondary={true} style={style} type = "submit" disabled={!this.state.gitRepositoryURL} />
   <RaisedButton label="Primary" primary={true} style={btnstyle} label="Service log" secondary={true} style={style} type = "button" href="/log/app-fabric"/>
   </form >
   </Paper>
                                    {this.state.clicked?<BaseImageCard cloneRepository={this.cloneRepository} yesClicked={this.state.yesClicked} cloneRepositoryYes = {this.cloneRepositoryYes}/>:null}
                                    {this.state.noClicked?<DeploymentCard clone={this.state.clone} deploy={this.state.deploy} />:null}                              
                                    
                                  <h3 align="left"><a href="/log/app-fabric" style={{bottom:'10px',textAlign:'left'}}>Click here to see service log</a></h3>

   </div>
   </MuiThemeProvider>
   );
}
})
module.exports=DashBoard;
