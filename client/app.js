var React = require('react');
var React = require('react-dom');

var FormData = React.createClass({
	getInitialState: function() {
    return {value: ''};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  handleClick: function(event){
  	console.log("Button is clicked", this.state.value);
  },
  render: function() {
    return (
    	<form action='/'>
        <input type="text" name="gitURL" value={this.state.value} onChange={this.handleChange}
        />
        <button type="submit" onClick = {this.handleClick}>Deploy1</button>
      </form>
    );
  }
});

ReactDOM.render(
	<FormData/>,
	document.getElementById('main')
)