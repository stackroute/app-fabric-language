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
class DialogOne extends React.Component{

  constructor(props) {
   super(props);
   this.state = {selectedOS:null};
 }
 handleChange = (event,index,value) =>{ 
   this.setState({selectedOS : value});
   // this.setState({text : value});
   console.log(value);
   this.props.data(value,this.props.service);
 }; 
 render(){
   // console.log('From Dialog Component : ');
   // console.log(this.props.data);
   // const check = this.props.data.map((baseObject) => {
   //   return <MenuItem value={baseObject.val} primaryText={baseObject.val} key={baseObject.val} />
   // });

   return(  
     <div>
     <DropDownMenu style={{width:"150px"}} value={this.state.selectedOS} onChange={this.handleChange.bind(this)}>
     <Subheader>Public Images</Subheader>
     <MenuItem value='Alpine'  primaryText="Alpine" />
     <MenuItem value='Debian-Jessie' primaryText="Debian Jessie" />
     <MenuItem value='ubuntu-Xenial' primaryText="ubuntu Xenial" />

     </DropDownMenu>
     </div>
     );
 }    
}
export default DialogOne;


// <MenuItem value={4} primaryText="alphine linux" />
//             <Divider />
//             <Subheader>Custom Images</Subheader>
//                 {check}

