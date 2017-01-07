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

        let el = `<a href="/part/${part._id}" class="list-group-item">
                    <p class="list-group-item-heading">${part.title} <span class="badge bg-light-blue">Qty: ${part.qty}</span></p>
                    <p class="list-group-item-text">
                      <b>#${part.num}</b><br>$${part.price} ($${part.myPrice}) ~ location: ${part.location}
                    </p>
                  </a>`;
      
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
	          <div className="col-md-6">
	            <div className="p-l-20">
	             	<form id="searchForm" className="m-t-0 m-b-0" onSubmit={this.handleSearch.bind(this)}>
	                  <div className="input-group">
	                    <input type="text" ref="searchQuery" className="form-control" placeholder="Search for..." />
	                    <span className="input-group-btn">
	                      <button className="btn btn-primary" type="submit">Search</button>
	                    </span>
	                  </div>
	                </form>

	                <div id="searchResult" className="m-t-10 list-group"></div>
	            </div>
	          </div>
	          <div className="col-md-6">
	            <div className="p-l-20 p-r-20 m-t-2 text-right">
	            	<Link to={`/settings`} className="btn btn-primary btn-sm m-r-5">Set Appliances/Locations</Link>
	            	<Link to={`/add-part`} className="btn btn-primary btn-sm">+ Add Part</Link>
	            </div>
	          </div>
	        </div>
	        <div className="text-center m-t-10 m-b-20">
	        	You have {this.props.zero} parts with quantity 0 {this.renderLink()}
	        </div>
	    </div>
    );
  }
}