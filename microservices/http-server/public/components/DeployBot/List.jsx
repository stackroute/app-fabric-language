import React from 'react';
import ReactDOM from 'react-dom';
import Row from './Row.jsx'; 

var List = React.createClass({
	handleDel: function (index) {
		this.props.itemDelete(index);
	},
  render: function() {
    var listItems= [], me=this;
    this.props.items.map(function (item,i){
    	listItems.push(<Row item={item} id={i} itemDelete={me.handleDel}/>)
    });
    return <ul style={{listStyle:"none"}}>{listItems}</ul>;
  }
});
module.exports= List;