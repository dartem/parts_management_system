import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
 
export default class Part extends Component {

  removePart() {
    if (confirm("Are you sure you want to DELETE this part?") == true) {
      Meteor.call('part.remove', this.props.part._id);
    }
  }

  substructOne() {
    const substructedQty = parseInt(this.props.part.qty) - 1;
    if (substructedQty >= 0) {
      Meteor.call('partQTY.update', this.props.part._id, substructedQty);
    }
  }

  addOne() {
    const addedQty = parseInt(this.props.part.qty) + 1;
    Meteor.call('partQTY.update', this.props.part._id, addedQty);
  }

  render() {

    let thisPhoto = '';
    (this.props.part.photo) ? thisPhoto = this.props.part.photo : null;

    return (

    	<div className="grid-item">
        <div className="thumbnail m-all-10">
          <img src={thisPhoto} alt="" />
          <div className="caption">
            <h4>{this.props.part.title} <i className="fa fa-trash-o text-red" aria-hidden="true" onClick={this.removePart.bind(this)}></i></h4>
            <div>Number: {this.props.part.num}</div>
            <div>QTY: {this.props.part.qty}</div>
            <div>Price: {this.props.part.price}</div>
            <div>My Price: {this.props.part.myPrice}</div>
            <div>Location: {this.props.part.location}</div>
            <div>Appliance: {this.props.part.appliance}</div>

            <div className="text-center">
              <div className="btn-group m-t-20" role="group" aria-label="...">
                <Link to={`/part/${this.props.part._id}`} className="btn btn-warning">Edit</Link>
                <button type="button" className="btn btn-default" onClick={this.substructOne.bind(this)}>- 1</button>
                <button type="button" className="btn btn-default" onClick={this.addOne.bind(this)}>+ 1</button>
              </div>
            </div>

          </div>
        </div>
      </div>
              
    );
  }
}
 
Part.propTypes = {
  part: PropTypes.object.isRequired,
};