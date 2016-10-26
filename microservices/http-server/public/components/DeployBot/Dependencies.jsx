import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import List from './List.jsx';

var configuration={};

class Dependency extends React.Component{

	
	state = {
		open: false,
		add:0,
		a:[],
		items: [],
		text: '',
		text2: '',
		id : 0
	};

	handleSubmit =(e) => {


		configuration[this.state.text]=this.state.text2;
		e.preventDefault();
		console.log("allow");

		this.setState({id:this.state.id+1});

		var nextItems = this.state.items.concat([{text: this.state.text,
			text2: this.state.text2, id:this.state.id}
			]);
		var nextText = '';
		this.setState({items: nextItems, text: nextText,text2: nextText});
	};

	onChange =(e) => {
		this.setState({text: e.target.value});
	};

	onChange1 =(e)=> {
		this.setState({text2: e.target.value});
		console.log("change"+this.state.text2);
	};

	Delete = (id) => {
		console.log("delete" + id);
		this.state.items.splice(id,1);
		this.setState({items:this.state.items});
		console.log(this.state.items);
	};
	
	handleClick=()=> {
		this.setState({open:true});
	};

	handleConfigurations=()=> {
		this.setState({open:false});
		this.props.data(configuration);
	};

	render() {
		console.log('Rendering Add!');
		const button =[
		<FlatButton 
		label="Save" 
		primary={true}
		onTouchTap={this.handleConfigurations}
		/>
		];
		
		return ( 
			<div>
			<FlatButton label="Configurations" onTouchTap={this.handleClick}/>
			<Dialog
			modal={true}
			actions={button}
			open={this.state.open}
			> 
			<div>
			<h3>Configurations</h3>
			<List items={this.state.items} 
			itemDelete={this.Delete} />
			<form>
			<TextField required hintText="Key" key="one" onChange={this.onChange} value={this.state.text} />
			<TextField required hintText="Value" key="two" onChange={this.onChange1} style={{paddingLeft:"10px"}} value={this.state.text2} />
			<FlatButton type='submit' onClick={this.handleSubmit} label="Add" primary={true}></FlatButton>
			</form>
			</div>
			</Dialog>
			</div>
			);
	};
};
export default Dependency;


// var a=[];
// 		for(var i=0;i<this.state.add;i++)
// 			{
// 				var id=i;
// 				a.push(
// 					<li id={id}>
// 						<TextField key="one" hintText="key"  className="Dependencies" />
// 						<TextField style={{paddingLeft:"10px"}} key="two" hintText="value" className="Configurations"  /> 
// 						<FlatButton onTouchTap={this.handleDelete.bind(this,id)}><NavigationClose /> </FlatButton>
// 					</li>
// 				);
// 			}






	// handleAdd=()=> {
	// 	this.setState({add:this.state.add+1});

	// };
	// handleDelete = (key) => {
	// 	console.log(key);
	// 	console.log(this.state.a);
 //      var index;
 //                this.state.a.forEach(function (d,i){
 //                    if(d.key==key){
 //                        index=i;
 //                    }

 //                });
 //                this.state.a.splice(index,1);
 //                this.setState({a:this.state.a});

	// };