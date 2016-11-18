import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Router, Link } from "react-router";

import { Appliances } from '../api/appliances.js';

import Appliance from "../ui/Appliance";
import LocationsImport from "./Locations";

class Settings extends Component {

	addAppliance(event) {
	    event.preventDefault();

	    document.getElementById("appliance_error_box").innerHTML = '';

	    const applianceName = ReactDOM.findDOMNode(this.refs.applianceName).value.trim();

	    if (applianceName != '' && applianceName != ' ') {
	 
		    Meteor.call('appliance.insert', applianceName);

		    ReactDOM.findDOMNode(this.refs.applianceName).value = '';

		} else {
	      document.getElementById("appliance_error_box").innerHTML = 'Can\'t be blank!';
	    }
	}

	renderAppliance() {
		return this.props.appliances.map((appliance) => (
		  <Appliance key={appliance._id} appliance={appliance} />
		));
	}

	render() {

		const {loading} = this.props;

		if (loading) {
			return (
				<div>
					<div><i className="fa fa-spinner" aria-hidden="true"></i></div>
				</div>
			);
		}

		if (this.props.appliances.length > 0) {
			return (
				<div>
					<h4 className="text-right"><Link to={`/`}><i className="fa fa-reply" aria-hidden="true"></i> All Parts</Link></h4>

					<div className="row m-t-20">
			            <div className="col-md-6">
			              	<div className="panel panel-info">
			                	<div className="panel-heading"><h5 className="m-all-0">Appliance</h5></div>
			                	<div className="panel-body">
			                		<form onSubmit={this.addAppliance.bind(this)} >
										<div className="input-group">
									    	<input type="text" className="form-control" placeholder="Appliance name" ref="applianceName" />
									    	<span className="input-group-btn">
									    		<button className="btn btn-primary" type="submit">Add</button>
									    	</span>
									    </div>
						          	</form>

						          	<div className="error m-b-20" id="appliance_error_box"></div>

									{this.renderAppliance()}
								</div>
			           		</div>
			          	</div>
			          	<div className="col-md-6">
			          		<LocationsImport />
			          	</div>
			    	</div>
				</div>
			);
		} else {
			return (
				<div>

					<h4 className="text-right"><Link to={`/`}><i className="fa fa-reply" aria-hidden="true"></i> All Parts</Link></h4>

					<div className="row m-t-20">

						<div className="col-md-6">

							<div className="alert alert-warning m-b-20">Add an appliance like Dryer, Washer, etc.</div>

							<form onSubmit={this.addAppliance.bind(this)} >
								<div className="input-group">
							    	<input type="text" className="form-control" placeholder="Appliance name" ref="applianceName" />
							    	<span className="input-group-btn">
							    		<button className="btn btn-primary" type="submit">Add</button>
							    	</span>
							    </div>
				          	</form>

				          	<div className="error" id="appliance_error_box"></div>

				        </div>
				        <div className="col-md-6">
			          		<LocationsImport />
			          	</div>

			        </div>

				</div>
			);
		}
	}
}

Settings.propTypes = {
  appliances: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  const appliancesHandle = Meteor.subscribe('appliances');
  const loading = !appliancesHandle.ready();

  return {
    loading,
    appliances: Appliances.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, Settings);