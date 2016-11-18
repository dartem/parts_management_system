import React from "react";
import { Link } from "react-router";

export class NoMatch extends React.Component {
	render() {
		return (
			<div className="row">
				<div className="col-md-8 col-md-offset-2">
					<h4 className="text-right"><Link to={`/`}><i className="fa fa-reply" aria-hidden="true"></i> All Parts</Link></h4>
					<h2 className="text-right">404 Error! No page found!</h2>
				</div>
			</div>
		);
	}
}