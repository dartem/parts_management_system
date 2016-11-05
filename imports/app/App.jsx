import React from "react";
import { Router, Route, browserHistory, withRouter } from "react-router";

import Home from "../components/Home";
import Settings from "../components/Settings";
import AddPart from "../components/AddPart";
import SinglePart from "../components/SinglePart";
import PartsZero from "../components/PartsZero";
import { NoMatch } from "../components/404page";

const requireAuth = function(nextState, replace) { 
	if (!Meteor.userId()) {
		replace({
	      	pathname: '/',
	    })
	}
}

export class App extends React.Component {

  render() {
  
   Accounts.onLogin(function() {
	 	window.location="/"; // Default page on logging in event
	 });
    	
    Accounts.onLogout(function() {
      document.body.innerHTML = '';
	  	window.location="/"; // Default page on signing out event
	 });

    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/settings" component={Settings} onEnter={requireAuth} />
        <Route path="/add-part" component={AddPart} onEnter={requireAuth} />
        <Route path="/part/:partId" component={SinglePart}/>
        <Route path="/parts-zero" component={PartsZero}/>
        <Route path="*" component={NoMatch}/>
      </Router>
    );
  }
}