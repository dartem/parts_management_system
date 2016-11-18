import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Router } from "react-router";

import { Locations } from '../api/locations.js';

import Location from "../ui/Location";

class LocationsImport extends Component {

	addLocation(event) {
	    event.preventDefault();

	    document.getElementById("location_error_box").innerHTML = '';

	    const locationName = ReactDOM.findDOMNode(this.refs.locationName).value.trim();

	    if (locationName != '' && locationName != ' ') {
	 
		    Meteor.call('location.insert', locationName);

		    ReactDOM.findDOMNode(this.refs.locationName).value = '';

		} else {
	      document.getElementById("location_error_box").innerHTML = 'Can\'t be blank!';
	    }
	}

	renderLocation() {
		return this.props.locations.map((location) => (
		  <Location key={location._id} location={location} />
		));
	}

	render() {

		const {loadingLocations} = this.props;

		if (loadingLocations) {
			return (
				<div>
					<div><i className="fa fa-spinner" aria-hidden="true"></i></div>
				</div>
			);
		}

		if (this.props.locations.length > 0) {
			return (
				<div className="panel panel-info">
			    	<div className="panel-heading"><h5 className="m-all-0">Locations</h5></div>
			    	<div className="panel-body">
			    		<form onSubmit={this.addLocation.bind(this)} >
							<div className="input-group">
						    	<input type="text" className="form-control" placeholder="Location name" ref="locationName" />
						    	<span className="input-group-btn">
						    		<button className="btn btn-primary" type="submit">Add</button>
						    	</span>
						    </div>
				      	</form>

				      	<div className="error m-b-20" id="location_error_box"></div>

						{this.renderLocation()}
					</div>
			    </div>
			);
		} else {
			return (
				<div>

					<div className="alert alert-warning m-b-20">Add a location like Office, Car, etc.</div>

					<form onSubmit={this.addLocation.bind(this)} >
						<div className="input-group">
					    	<input type="text" className="form-control" placeholder="Location name" ref="locationName" />
					    	<span className="input-group-btn">
					    		<button className="btn btn-primary" type="submit">Add</button>
					    	</span>
					    </div>
				  	</form>

				  	<div className="error" id="location_error_box"></div>

				</div>
			);
		}

	}

}

Locations.propTypes = {
  locations: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  const locationsHandle = Meteor.subscribe('locations');
  const loadingLocations = !locationsHandle.ready();

  return {
    loadingLocations,
    locations: Locations.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, LocationsImport);