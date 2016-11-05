import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from "react-router";

import { Parts } from '../api/parts.js';

export class Header extends Component {

  handleSearch(event) {
    event.preventDefault();

    const query = ReactDOM.findDOMNode(this.refs.searchQuery).value.trim();

    if (query) {

      let count = 1;

      const searchResult = document.getElementById("searchResult");

      searchResult.innerHTML = '';

      var queryRes = Parts.find({  $or: [ { num: {$regex: ".*" + query + ".*", $options: "i"}}, { title: {$regex: ".*" + query + ".*", $options: "i"}} ] }).fetch().forEach(function(part) {

      	let el = `<div class="m-t-10">
      		${count}. <b>${part.title} (Qty: ${part.qty})</b> - <a href="/part/${part._id}">Update Part</a>
      	</div>
      	<div class="p-l-15 m-b-10 gray-color">
      		#${part.num} ~ $${part.price} ($${part.myPrice}) ~ location: ${part.location}</div>
      	</div>`;
      
        searchResult.innerHTML += el;
        count++;
      });

      if (count == 1) {
        searchResult.innerHTML = 'No result found ... ';
      }

    }
  }

  renderLink() {
  	return (this.props.zero > 0) ? <Link to={`/parts-zero`}> See All</Link> : null;
  }
  
  render() {

    return (
    	<div>
	    	<div className="row">
	          <div className="col-md-8">
	            <div className="p-l-20 p-r-20">
	             	<form id="searchForm" className="m-t-0 m-b-0" onSubmit={this.handleSearch.bind(this)}>
	                  <div className="input-group">
	                    <input type="text" ref="searchQuery" className="form-control" placeholder="Search for..." />
	                    <span className="input-group-btn">
	                      <button className="btn btn-default" type="submit">Search</button>
	                    </span>
	                  </div>
	                </form>

	                <div id="searchResult" className="m-t-10"></div>
	            </div>
	          </div>
	          <div className="col-md-4">
	            <div className="p-l-20 p-r-20 text-right">
	            	<Link to={`/add-part`} className="btn btn-default">+ Add Part</Link>
	            </div>
	          </div>
	        </div>
	        <div className="text-center m-t-20">
	        	You have {this.props.zero} parts with quantity 0 {this.renderLink()}
	        </div>
	    </div>
    );
  }
}