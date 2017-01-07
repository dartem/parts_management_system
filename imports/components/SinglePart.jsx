import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Router, Link } from "react-router";

import { Parts } from '../api/parts.js';
import { Locations } from '../api/locations.js';
import { Appliances } from '../api/appliances.js';
import { Photos } from '../api/photos.js';

class AddPart extends Component {
		
	updatePart(event) {
	    event.preventDefault();

	    document.getElementById("part_error_box").innerHTML = '';

	    let partTitle = ReactDOM.findDOMNode(this.refs.partTitle).value;
	    let partNumber = ReactDOM.findDOMNode(this.refs.partNumber).value.trim();
	    let partPrice = ReactDOM.findDOMNode(this.refs.partPrice).value.trim();
	    let partMyPrice = ReactDOM.findDOMNode(this.refs.partMyPrice).value.trim();
	    let partLocation = ReactDOM.findDOMNode(this.refs.partLocation).value.trim();
	    let partAppliance = ReactDOM.findDOMNode(this.refs.partAppliance).value.trim();

	    if (partTitle != '' && partNumber != '') {
	  		Meteor.call('fullPart.update', this.props.parts[0]._id, partTitle, partNumber, partPrice, partMyPrice, partLocation, partAppliance);
	  		
	  		document.getElementById("part_success_box").innerHTML = `<span class="updated-2-sec"> - updated</span>`;
	  		$('.updated-2-sec').fadeOut(2000);
	  	} else {
	  		document.getElementById("part_error_box").innerHTML += `Part title & number can't be blank!<br>QTY should be a number!`;
	  	}
	    
	}

	substructOne() {
		const substructedQty = parseInt(this.props.parts[0].qty) - 1;
		if (substructedQty >= 0) {
			Meteor.call('partQTY.update', this.props.parts[0]._id, substructedQty);
		}
	}

	addOne() {
		const addedQty = parseInt(this.props.parts[0].qty) + 1;
		Meteor.call('partQTY.update', this.props.parts[0]._id, addedQty);
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

	photoInputOnChange(e){
		let files = e.currentTarget.files;
		if(files && files[0]){

			let FR = new FileReader();
			FR.onload = (data) => {
				Meteor.call('partPhoto.update', this.props.parts[0]._id, data.target.result);
			}
			FR.readAsDataURL(files[0]);

		}
	}

	renderPhoto(){

		if(this.props.parts[0].photo){
			return (
				<div>
					<img width={100} src={this.props.parts[0].photo} />
				</div>
			)
		}
	}

	removeImage(e) {
		e.preventDefault();
		if (confirm("Remove Image?") == true) {
	      Meteor.call('partImage.remove', this.props.parts[0]._id);
	    }
	}

	renderRemoveImage() {
		if (this.props.parts[0].photo) {
			return <button type="button" className="btn btn-danger btn-xs m-t-20" onClick={this.removeImage.bind(this)}>Remove Image</button>
		}
		
	}

	render() {

		if (this.props.parts[0]) {

			return (
				<div>

					<div className="row m-t-20">

						<div className="col-md-8 col-md-offset-2">

							<h4 className="text-right"><Link to={`/`}><i className="fa fa-reply" aria-hidden="true"></i> All Parts</Link></h4>

							<div className="panel panel-info">
						    	<div className="panel-heading"><h5 className="m-all-0">Update {this.props.parts[0].title} info <span className="badge">Qty: {this.props.parts[0].qty}</span></h5></div>
						    	<div className="panel-body">

						    		<form onSubmit={this.finishUpdate.bind(this)}>
									    
									    <div className="row m-b-10">
									    	<div className="col-sm-6">
									    		<label>Title</label>
									    		<input type="text" onChange={this.updatePart.bind(this)} className="form-control" value={this.props.parts[0].title} ref="partTitle" />
									    	</div>
									    	<div className="col-sm-6">
									    		<label className="">Part Number</label>
									    		<input type="text" onChange={this.updatePart.bind(this)} className="form-control" value={this.props.parts[0].num} ref="partNumber" />
									    	</div>
									    </div>

									    <div className="row">
									    	<div className="col-sm-3">
									    		<label className=" m-t-10">Price</label>
									    		<input type="text" onChange={this.updatePart.bind(this)} className="form-control" value={this.props.parts[0].price} ref="partPrice" />
									    	</div>
									    	<div className="col-sm-3">
									    		<label className=" m-t-10">My Price</label>
									    		<input type="text" onChange={this.updatePart.bind(this)} className="form-control" value={this.props.parts[0].myPrice} ref="partMyPrice" />
									    	</div>
									    	<div className="col-sm-3">
												<label className=" m-t-10">Location</label>
											    <select className="form-control" ref="partLocation" onChange={this.updatePart.bind(this)}>
											    	<option value={this.props.parts[0].location}>{this.props.parts[0].location}</option>
											    	<option value=''>--------</option>
											    	{this.renderLocations()}
											    </select>
									    	</div>
									    	<div className="col-sm-3">
												<label className=" m-t-10">Appliance</label>
											    <select className="form-control" ref="partAppliance" onChange={this.updatePart.bind(this)}>
											    	<option value={this.props.parts[0].appliance}>{this.props.parts[0].appliance}</option>
											    	<option value=''>--------</option>
											    	{this.renderAppliances()}
											    </select>
									    	</div>
									    </div>

									    <div className="row m-t-20">
									    	<div className="col-md-4">
									    		{this.renderPhoto()}
									    	</div>
									    	<div className="col-md-8">
									    		<input type='file' onChange={this.photoInputOnChange.bind(this)} className="width100Poh btn"/>

									    		{this.renderRemoveImage()}
									    		
									    	</div>
									    </div>

										<div className="text-center">
											<div className="btn-group m-t-20" role="group" aria-label="...">
												<Link to={`/`} className="btn btn-primary">Finish Update <span id="part_success_box"></span></Link>
												<button type="button" className="btn btn-default" onClick={this.substructOne.bind(this)}>- 1</button>
												<button type="button" className="btn btn-default" onClick={this.addOne.bind(this)}>+ 1</button>
											</div>
										</div>

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
  photos: PropTypes.array.isRequired,
};
 
export default createContainer(({ params }) => {
  Meteor.subscribe('parts');
  Meteor.subscribe('locations');
  Meteor.subscribe('appliances');
  Meteor.subscribe('photos');

  const partId = params.partId;

  return {
    parts: Parts.find({ "_id" : partId }, { sort: { createdAt: -1 } }).fetch(),
    locations: Locations.find({}, { sort: { createdAt: -1 } }).fetch(),
    appliances: Appliances.find({}, { sort: { createdAt: -1 } }).fetch(),
    photos: Photos.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, AddPart);