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
import ActionDone from 'material-ui/svg-icons/action/done';
  const iconStyles = {
    marginRight: 24,
  };
    const style = {
        marginTop: 0,
    };
    
    var deploymentCard = React.createClass({
      getInitialState() {
          return {
              status:false  
          };
      },
      componentDidMount() {
    setTimeout(() => {
      this.setState({status:true});
    }, 2000) ;
  },
        render() {
            return (
              <Card>
            <CardHeader
              title="Deployment In Progress"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardActions>
                <List>
                  <ListItem primaryText="Cloning" leftIcon={this.state.status?<ActionDone />:<CircularProgress size={0.4} style ={style}/>} />
                  <ListItem primaryText="Building Base-Image" leftIcon={this.state.status?<ActionDone />:<CircularProgress size={0.4} style ={style}/>} />
                  <ListItem primaryText="Deploying" leftIcon={this.state.status?<ActionDone />:<CircularProgress size={0.4} style ={style}/>} />
                </List>              
            </CardActions>            
         </Card>
                
            );
        }
    });
    export default deploymentCard;