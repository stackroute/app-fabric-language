import React from "react";
import ReactDOM from "react-dom";
import {Router,Route,hashHistory} from "react-router";
import Login from "./Login.jsx";
import DashBoard from "./DashBoard.jsx";
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


var Index=React.createClass({
	getChildContext: function() {
    	return {
    		socket: io()
    	};
    },
    childContextTypes: {
		socket: React.PropTypes.object
	},
    render(){
        return <Router history={hashHistory}>
            <Route path="/" component={Login}/>
            <Route path="/form" component={DashBoard}/>
        </Router>
    }
});

ReactDOM.render(<Index/>,document.getElementById('app'))