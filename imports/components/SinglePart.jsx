import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Router, Link } from "react-router";
import request from 'request';
import Dropzone from 'react-dropzone';

import { Parts } from '../api/parts.js';
import { Locations } from '../api/locations.js';
import { Appliances } from '../api/appliances.js';

class AddPart extends Component {
		
	updatePart(event) {
	    event.preventDefault();

	    document.getElementById("part_error_box").innerHTML = '';

	    let partTitle = ReactDOM.findDOMNode(this.refs.partTitle).value.trim();
	    let partNumber = ReactDOM.findDOMNode(this.refs.partNumber).value.trim();
	    let partQty = ReactDOM.findDOMNode(this.refs.partQty).value.trim();
	    	partQty = parseInt(partQty);
	    let partPrice = ReactDOM.findDOMNode(this.refs.partPrice).value.trim();
	    let partMyPrice = ReactDOM.findDOMNode(this.refs.partMyPrice).value.trim();
	    let partLocation = ReactDOM.findDOMNode(this.refs.partLocation).value.trim();
	    let partAppliance = ReactDOM.findDOMNode(this.refs.partAppliance).value.trim();

	    if (partTitle != '' && partNumber != '' && !isNaN(partQty) ) {
	  		Meteor.call('fullPart.update', this.props.parts[0]._id, partTitle, partNumber, partQty, partPrice, partMyPrice, partLocation, partAppliance);
	  		
	  		document.getElementById("part_success_box").innerHTML = `<span class="updated-2-sec"> - updated</span>`;
	  		$('.updated-2-sec').fadeOut(2000);
	  	} else {
	  		document.getElementById("part_error_box").innerHTML += `Part title & number can't be blank!<br>QTY should be a number!`;
	  	}
	    
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

	finishUpdate(event) {
	    event.preventDefault();
		window.location="/";
	}

	render() {

		if (this.props.parts[0]) {

			return (
				<div>

					<div className="row m-t-20">

						<div className="col-md-8 col-md-offset-2">

							<div className="text-right m-b-10">
								<Link to={`/`}><i className="fa fa-reply" aria-hidden="true"></i> All Parts</Link>
							</div>

							<div className="panel panel-default">
						    	<div className="panel-heading"><h5 className="m-all-0">Update {this.props.parts[0].title} info</h5></div>
						    	<div className="panel-body">

						    		<form onSubmit={this.finishUpdate.bind(this)}>
						    			<label>Title</label>
									    <input type="text" onChange={this.updatePart.bind(this)} className="form-control" value={this.props.parts[0].title} ref="partTitle" />
									    
									    <label className=" m-t-10">Part Number</label>
									    <input type="text" onChange={this.updatePart.bind(this)} className="form-control" value={this.props.parts[0].num} ref="partNumber" />
									    
									    <div className="row">
									    	<div className="col-md-4">
										    	<label className=" m-t-10">Quantity</label>
										    	<input type="text" onChange={this.updatePart.bind(this)} className="form-control" value={this.props.parts[0].qty} ref="partQty" />
									    	</div>
									    	<div className="col-md-4">
									    		<label className=" m-t-10">Market Price</label>
									    		<input type="text" onChange={this.updatePart.bind(this)} className="form-control" value={this.props.parts[0].price} ref="partPrice" />
									    	</div>
									    	<div className="col-md-4">
									    		<label className=" m-t-10">My Price</label>
									    		<input type="text" onChange={this.updatePart.bind(this)} className="form-control" value={this.props.parts[0].myPrice} ref="partMyPrice" />
									    	</div>
									    </div>

									    <div className="row">
									    	<div className="col-md-6">
												<label className=" m-t-10">Location</label>
											    <select className="form-control" ref="partLocation" onChange={this.updatePart.bind(this)}>
											    	<option value={this.props.parts[0].location}>{this.props.parts[0].location}</option>
											    	<option value=''>--------</option>
											    	{this.renderLocations()}
											    </select>
									    	</div>
									    	<div className="col-md-6">
												<label className=" m-t-10">Appliance</label>
											    <select className="form-control" ref="partAppliance" onChange={this.updatePart.bind(this)}>
											    	<option value={this.props.parts[0].appliance}>{this.props.parts[0].appliance}</option>
											    	<option value=''>--------</option>
											    	{this.renderAppliances()}
											    </select>
									    	</div>
									    </div>

										<Link to={`/`} className="btn btn-primary btn-block m-t-20">Finish Update <span id="part_success_box"></span></Link>
						          	</form>

						          	<div className="error" id="part_error_box"></div>
						    		
								</div>
						    </div>

				        </div>

			        </div>

				</div>
			);
		} else {
			return null;
		}
		
	}
}

AddPart.propTypes = {
  parts: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  appliances: PropTypes.array.isRequired,
};
 
export default createContainer(({ params }) => {
  Meteor.subscribe('parts');
  Meteor.subscribe('locations');
  Meteor.subscribe('appliances');

  const partId = params.partId;

  return {
    parts: Parts.find({ "_id" : partId }, { sort: { createdAt: -1 } }).fetch(),
    locations: Locations.find({}, { sort: { createdAt: -1 } }).fetch(),
    appliances: Appliances.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, AddPart);