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
				}
	    };
	}

	momentify(date) {
		return moment(date, "x").fromNow();
	}

	render() {
		return (
			<div>
				<h5>{this.props.raid.description} <span>({this.props.raid.verified ? 'Verified' : 'Not Verified' })</span></h5>
				<p>{this.momentify(this.props.created)}</p>
				<p>Date Ocurred: {this.props.raid.dateOcurred}</p>
				<p>Any Detained: {this.props.raid.anyDetained}</p>
				<p>{this.props.raid.address}</p>
				<p>Source: {this.props.raid.knowHappened}</p>
				<blockquote>{this.props.raid.knowHappenedText ? this.props.raid.knowHappenedText : ''}</blockquote>
				<hr />
			</div>


		)
	}

}
