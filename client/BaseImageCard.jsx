import React from "react";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DeploymentCard from "./deploymentCard.jsx";


const style = {
	margin: 14,	
};


var BaseImageCard = React.createClass({
	render() {
		return(
			<Card>
				<CardHeader
			      title="Do You Require a BASE-IMAGE For Your Deployment ? "
			      actAsExpander={true}
			      showExpandableButton={true}
			    />
			    <RaisedButton label="YES" primary={true} style={style} />
			    <RaisedButton label="NO" secondary={true} style={style} onClick={this.props.cloneRepository}/>
			 </Card>
			);
	}
});

export default BaseImageCard;