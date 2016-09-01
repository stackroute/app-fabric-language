import React from 'react';
import ReactDOM from 'react-dom';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const styles = {
    paperstyle: {
        width: "100%",
        margin: '10px',
        textAlign: 'center',
        display: 'inline-block',
        padding: '30px'
    }
};

const muiTheme = getMuiTheme({
   palette: {
       textColor: cyan500,
   },
});

const style = {
   margin: 12,
};

 const btnstyle={
    width:"80%"
 }
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
       this.setState({gitRepositoryURL: ''});
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
<Paper style={styles.paperstyle}>
           <form onSubmit = { this.cloneRepository } >
               <TextField
                    fullWidth={true}
                   type = "text"
                   hintText="Enter GIT URL"
                   floatingLabelText="GIT URL"
                   value = { this.state.gitRepositoryURL }
                   onChange = { this.handleGitUrlChange }
                   name = "gitURL"
                   />
            <RaisedButton label="Primary" primary={true} style={btnstyle} label="Deploy" secondary={true} style={style} type = "submit" disabled={!this.state.gitRepositoryURL} />
           </form >
</Paper>
           </MuiThemeProvider>
       );
   }
})

var App = React.createClass({
   render: function() {
       return <Form />
   }
});

module.exports=Form;
