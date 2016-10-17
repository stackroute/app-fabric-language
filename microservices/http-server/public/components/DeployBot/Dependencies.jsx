import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Configurations from './Configurations.jsx';
class Dependency extends React.Component{
	 constructor() {
    super();
    this.state = {
      open: false,
      add:0,
      a:[],
  		}
 	}
	handleClick=()=> {
		this.setState({open:true});
	};
	handleConfigurations=()=> {
		this.setState({open:false});
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
					<Configurations />
					</div>
				</Dialog>
			</div>
		);
	}
}
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