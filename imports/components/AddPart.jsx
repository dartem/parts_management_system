import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Router, Link } from "react-router";

import { Parts } from '../api/parts.js';
import { Locations } from '../api/locations.js';
import { Appliances } from '../api/appliances.js';

import Part from "../ui/Part";

class AddPart extends Component {

	addPart(event) {
	    event.preventDefault();

	    document.getElementById("part_error_box").innerHTML = '';

	    let partTitle = ReactDOM.findDOMNode(this.refs.partTitle).value.trim();
	    let partNumber = ReactDOM.findDOMNode(this.refs.partNumber).value.trim();
	    let partQty = ReactDOM.findDOMNode(this.refs.partQty).value.trim();
	    let partPrice = ReactDOM.findDOMNode(this.refs.partPrice).value.trim();
	    let partMyPrice = ReactDOM.findDOMNode(this.refs.partMyPrice).value.trim();
	    let partLocation = ReactDOM.findDOMNode(this.refs.partLocation).value.trim();
	    let partAppliance = ReactDOM.findDOMNode(this.refs.partAppliance).value.trim();

	    if (partTitle != '' && partTitle != ' ' && partNumber != '' && partNumber != ' ') {

	    	if (partQty == '' || partQty == ' ') {
	    		partQty = 0;
	    	}

	    	partQty = parseInt(partQty);

	    	if (partPrice == '' || partPrice == ' ') {
	    		partPrice = '...';
	    	}

	    	if (partMyPrice == '' || partMyPrice == ' ') {
	    		partMyPrice = '...';
	    	}

	    	if (partLocation == '' || partLocation == ' ') {
	    		partLocation = '...';
	    	}

	    	if (partAppliance == '' || partAppliance == ' ') {
	    		partAppliance = '...';
	    	}
	 
		    Meteor.call('part.insert', partTitle, partNumber, partQty, partPrice, partMyPrice, partLocation, partAppliance);

		    document.getElementById("part_success_box").innerHTML = `<div class="alert alert-success" role="alert">
		    	${partTitle} was added successfully!
		    </div>`;

		    ReactDOM.findDOMNode(this.refs.partTitle).value = '';
		    ReactDOM.findDOMNode(this.refs.partNumber).value = '';
		    ReactDOM.findDOMNode(this.refs.partQty).value = '';
		    ReactDOM.findDOMNode(this.refs.partPrice).value = '';
		    ReactDOM.findDOMNode(this.refs.partMyPrice).value = '';
		    ReactDOM.findDOMNode(this.refs.partLocation).value = '';
		    ReactDOM.findDOMNode(this.refs.partAppliance).value = '';

		} else {
	      document.getElementById("part_error_box").innerHTML = 'Part title & number can\'t be blank!';
	    }
	}

	renderPart() {
		return this.props.parts.map((part) => (
		  <Part key={part._id} part={part} />
		));
	}

	renderLocations() {
		return this.props.locations.map((location) => (
		  <option key={location._id} value={location.name}>{location.name}</option>
		));
	}

	renderAppliances() {
		return this.props.appliances.map((appliance) => (
		  <option key={appliance._id} value={appliance.name}>{appliance.name}</option>
		));
	}

	render() {

		return (
			<div>

				<div className="row m-t-20">

					<div className="col-md-8 col-md-offset-2">

						<h4 className="text-right"><Link to={`/`}><i className="fa fa-reply" aria-hidden="true"></i> All Parts</Link></h4>

						<div className="panel panel-default">
					    	<div className="panel-heading"><h5 className="m-all-0">Add Part</h5></div>
					    	<div className="panel-body">

					    		<div id="part_success_box"></div>

					    		<form onSubmit={this.addPart.bind(this)}>
								    <input type="text" className="form-control" placeholder="Part Title" ref="partTitle" />
								    <input type="text" className="form-control m-t-15" placeholder="Part number" ref="partNumber" />
								    <div className="row">
									    <div className="col-md-4">
								    		<input type="text" className="form-control m-t-15" placeholder="Part QTY" ref="partQty" />
								    	</div>
									    <div className="col-md-4">
											<input type="text" className="form-control m-t-15" placeholder="Part Price" ref="partPrice" />
									    </div>
									    <div className="col-md-4">
											<input type="text" className="form-control m-t-15" placeholder="Part My Price" ref="partMyPrice" />
									    </div>
									</div>
									<div className="row">
									    <div className="col-md-6">
										    <select className="form-control m-t-15" ref="partLocation">
										    	<option value="">- Choose Location -</option>
										    	{this.renderLocations()}
										    </select>
										</div>
										<div className="col-md-6">
										    <select className="form-control m-t-15" ref="partAppliance">
										    	<option value="">- Choose Appliance -</option>
										    	{this.renderAppliances()}
										    </select>
										</div>
									</div>
								    <button className="btn btn-primary btn-block m-t-15" type="submit">Add Part</button>
					          	</form>

					          	<div className="error" id="part_error_box"></div>
					    		
							</div>
					    </div>

			        </div>

		        </div>

			</div>
		);
		
	}
}

AddPart.propTypes = {
  parts: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  appliances: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  Meteor.subscribe('parts');
  Meteor.subscribe('locations');
  Meteor.subscribe('appliances');

  return {
    parts: Parts.find({}, { sort: { createdAt: -1 } }).fetch(),
    locations: Locations.find({}, { sort: { createdAt: -1 } }).fetch(),
    appliances: Appliances.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, AddPart);