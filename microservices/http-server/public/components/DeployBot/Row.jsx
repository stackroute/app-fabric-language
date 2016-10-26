import React from 'react';
import ReactDOM from 'react-dom';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
var Row = React.createClass({
	handleDelete: function () {
		console.log("handler")
		this.props.itemDelete(this.props.id);
	},
	render() {
	   return (
	   	<li key={this.props.id}>
	   	
	      <div> {this.props.item.text}
	       {this.props.item.text2}
	 		<NavigationClose style={{marginLeft:'30px'}} 
	 		onTouchTap={this.handleDelete}/> </div>
	 	
	 	</li>
 	);
	}
});
module.exports = Row;