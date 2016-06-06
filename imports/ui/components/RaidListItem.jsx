import React, { Component } from 'react';
import {mount} from 'react-mounter';
//import ReactDOM from 'react-dom';
import { Mongo } from 'meteor/mongo';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';


const style = {
	fontSize: '12em',
	fontWeight: '100'
}

export default class RaidListItem extends TrackerReact(Component){
	constructor(props) {
	    super(props);

	    this.state = {
				subscription: {
					raids: Meteor.subscribe('allRaids')
				}
	    };
	}

	momentify(date) {
		return moment(date, "x").fromNow();
	}

	render() {
		return (
			<div>
				<h5>{this.props.address}</h5>
				<p>{this.momentify(this.props.created)}</p>
				<p>{this.props.description}</p>
				<hr />
			</div>


		)
	}

}
