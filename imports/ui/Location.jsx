import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
 
export default class Location extends Component {

  removeLocation() {
    if (confirm("Are you sure you want to DELETE this location?") == true) {
      Meteor.call('location.remove', this.props.location._id);
    }
  }

  render() {

    return (

    	<div>
        <button className="delete" onClick={this.removeLocation.bind(this)}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
        <h4>{this.props.location.name}</h4>
        <div className="clearfix"></div>
      </div>
              
    );
  }
}
 
Location.propTypes = {
  location: PropTypes.object.isRequired,
};