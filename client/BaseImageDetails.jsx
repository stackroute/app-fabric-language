import React from "react";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';
import ToggleRadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import DeploymentCard from "./deploymentCard.jsx";

var BaseImageDetails = React.createClass({
	render(){
		return(
			<Card>
			<CardHeader
			title="Do You Require a BASE-IMAGE For Your Deployment ? "
			actAsExpander={true}
			showExpandableButton={true}
			/>
			<TextField hintText="Image Tag" underlineShow={false} />
			<Divider /> 
			</Card>
			);
	}
});

export default BaseImageDetails;