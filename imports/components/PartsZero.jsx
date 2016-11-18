import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Router, Link } from "react-router";

import { Parts } from '../api/parts.js';

import Part from "../ui/Part";

import Masonry from 'react-masonry-component';

var masonryOptions = {
    transitionDuration: 0
};

class Home extends Component {

	renderPart() {
		return this.props.zeroParts.map((part) => (
		  <Part key={part._id} part={part} />
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

		if (Meteor.user()) {
			return (
				<div className="m-t-20">

					<h4 className="text-right m-l-10 m-r-10"><Link to={`/`}><i className="fa fa-reply" aria-hidden="true"></i> All Parts</Link></h4>

					<div className="panel panel-info m-l-10 m-r-10">
						<div className="panel-heading"><h5 className="m-all-0">Parts with QTY 0</h5></div>
					</div>
					<Masonry
				         className={'masonry-default m-t-10'} // default ''
				         elementType={'div'} // default 'div'
				         options={masonryOptions} // default {}
				         disableImagesLoaded={false} // default false
				         updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
				    >
				        {this.renderPart()}
				    </Masonry>
					
				</div>
			);
		} else {
			return (
				<div className="alert alert-success" role="alert">
		    		Please login or register!
		    	</div>
			);
		}
		
	}
}

Home.propTypes = {
  parts: PropTypes.array.isRequired,
  zeroParts: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  const partsHandle = Meteor.subscribe('parts');
  const loading = !partsHandle.ready();

  return {
  	loading,
    parts: Parts.find({}, { sort: { createdAt: -1 } }).fetch(),
    zeroParts: Parts.find({ qty : 0 }).fetch(),
  };
}, Home);