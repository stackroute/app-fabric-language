import React from 'react';
import ReactDOM from 'react-dom';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const muiTheme = getMuiTheme({
   palette: {
       textColor: cyan500,
   },
});

const style = {
   margin: 12,
};

var Form = React.createClass({

   getInitialState: function() {
       return { gitRepositoryURL: '' };
   },

   handleGitUrlChange: function(event) {
       this.setState({ gitRepositoryURL: event.target.value });
       console.log(event.target.value)
   },

   cloneRepository(e) {
       e.preventDefault();
       console.log(this.state.gitRepositoryURL);
       
       $.ajax({
       url: '/deploy',
       dataType: 'json',
       type: 'POST',
       data: {
               "gitURL":this.state.gitRepositoryURL
           }
       }).done(function(data) {
           console.log("successful");
       });
   

   },

   render: function() {
       return (
           <MuiThemeProvider muiTheme={muiTheme}>

           <form onSubmit = { this.cloneRepository } >
               <TextField
                   type = "text"
                   hintText="Enter GIT URL"
                   floatingLabelText="GIT URL"
                   value = { this.state.gitRepositoryURL }
                   onChange = { this.handleGitUrlChange }
                   name = "gitURL"
                   />
               {this.state.gitRepositoryURL.length==0?null:<FlatButton label="Deploy" secondary={true} style={style} type = "submit" />}
           </form >

           </MuiThemeProvider>
       );
   }
})

var App = React.createClass({
   render: function() {
       return <Form />
   }
});

ReactDOM.render( <App /> , document.body);
