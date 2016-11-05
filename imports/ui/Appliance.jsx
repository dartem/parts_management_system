import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
 
export default class Appliance extends Component {

  removeAppliance() {
    if (confirm("Are you sure you want to DELETE this appliance?") == true) {
      Meteor.call('appliance.remove', this.props.appliance._id);
    }
  }

  render() {

    return (

    	<div>
        <button className="delete" onClick={this.removeAppliance.bind(this)}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
        <h4>{this.props.appliance.name}</h4>
        <div className="clearfix"></div>
      </div>
              
    );
  }
}
 
Appliance.propTypes = {
  appliance: PropTypes.object.isRequired,
};