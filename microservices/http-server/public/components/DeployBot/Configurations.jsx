import React from 'react';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import List from './List.jsx';

var Configurations = React.createClass({
  getInitialState: function() {
    return {items: [], text: '',text2: '',id : 0};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  onChange1: function(e) {
    this.setState({text2: e.target.value});
    console.log("change"+this.state.text2);
  },
  Delete: function (id) {
    console.log("delete" + id);
    this.state.items.splice(id,1);
    this.setState({items:this.state.items});
    console.log(this.state.items);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    console.log("allow");
    console.log(this.state.text2);
    this.setState({id:this.state.id+1});

    var nextItems = this.state.items.concat([{text: this.state.text,
      text2: this.state.text2, id:this.state.id}
      ]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText,text2: nextText});
  },
  render: function() {
    return (
      <div>
        <h3>Configurations</h3>
        <List items={this.state.items} 
                  itemDelete={this.Delete} />
        <form >
          <TextField hintText="Key" key="one" onChange={this.onChange} value={this.state.text} />
          <TextField hintText="Value" key="two" onChange={this.onChange1} style={{paddingLeft:"10px"}} value={this.state.text2} />
          <FlatButton onClick={this.handleSubmit} label="Add" primary={true}></FlatButton>

        </form>
      </div>
    );
  }
});
module.exports = Configurations;