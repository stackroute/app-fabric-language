import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
class SelectClass extends React.Component {
	constructor(props) {
    super(props);
  	this.state = {
		value: 3,
  		};
	}
	handleChange = (event, index, value) => 
  		this.setState({value});
  render() {
    return (
      <div >
        <SelectField style={{marginLeft:"20px",marginBottom:"20px",borderRadius:"5px 5px 5px 5px",width:"400px"}} maxHeight={100} value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="One" />
			<MenuItem value={2} primaryText="Two" />
		    <MenuItem value={3} primaryText="Three" />
			<MenuItem value={4} primaryText="Four" />
			<MenuItem value={5} primaryText="Five" />
		</SelectField>		      
       </div>
       );
	}
};

export default SelectClass;