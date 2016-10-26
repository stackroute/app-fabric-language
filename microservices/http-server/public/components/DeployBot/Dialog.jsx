import React from 'react';
import ReactDOM from 'react-dom'; 
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};
var check = [];
class DialogOne extends React.Component{

	constructor(props) {
    super(props);
    this.state = {value: 0,openDialog:false};
  }
  handleChange = (event,index,value) =>{ 
    this.setState({value : value});
   }; 
   render(){
    console.log('From Dialog Component : ');
    console.log(this.props.data);
    const check = this.props.data.map((baseObject) => {
      return <MenuItem value={baseObject.val} primaryText={baseObject.val} key={baseObject.val} />
    });

    return(  
  			<div>
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            <Subheader>Public Images</Subheader>
              <MenuItem value={1} primaryText="ubuntutrusty" />
              <MenuItem value={2} primaryText="ubuntu xenial" />
              <MenuItem value={3} primaryText="ubuntu precise" />
              <MenuItem value={4} primaryText="alphine linux" />
            <Divider />
            <Subheader>Custom Images</Subheader>
                {check}
          </DropDownMenu>
  			</div>
	 	);
	}	
}
export default DialogOne;
