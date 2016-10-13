import React from 'react';
import ReactDOM from 'react-dom'; 
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SubHeader from 'material-ui/SubHeader';
import Divider from 'material-ui/Divider';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class DailogOne extends React.Component{

	constructor(props) {
    super(props);
    this.state = {value: 0,openDialog:false};
  }
  handleChange = (event,index,value) =>{ 
    this.setState({value : value});
   }; 
   handleOpen = () => {
      this.setState({openDialog:true});
   };
   handleCancel = () => {
    this.setState({openDialog:false});
   }
	render(){ 
      const action = [
        <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.handleCancel}
          />,
        <FlatButton
            label="Submit"
            primary={true}
            onClick={this.handleSave}
        />,
    ];    
    return(  
      <div>
        <div>
          <Dialog
            title = "Create Custom Image"
            modal={true}
            open={this.state.openDialog}
            actions={action}
            autoScrollBodyContent={true}
            style={{marginTop:"20px"}}>
            <textarea style={{width:"500px",height:"200px"}}/>  
            </Dialog>
        </div>
  			<div>
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            <SubHeader>Public Images</SubHeader>
              <MenuItem value={1} primaryText="ubuntutrusty" />
              <MenuItem value={2} primaryText="ubuntu xenial" />
              <MenuItem value={3} primaryText="ubuntu precise" />
              <MenuItem value={4} primaryText="alphine linux" />
              <Divider />
              <MenuItem value={5} primaryText="Custom Image" onClick={this.handleOpen}/>
          </DropDownMenu>
  			</div>
      </div>
	 	);
	}	
}
export default DailogOne;
