import React, { Component } from 'react';
import {mount} from 'react-mounter';
//import ReactDOM from 'react-dom';
import { Mongo } from 'meteor/mongo';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import {Raids} from '../../api/raids/raids.js';
import RaidListItem from './RaidListItem.jsx';
import { TAPi18n } from 'meteor/tap:i18n';

export default class RaidList extends TrackerReact(Component){
	constructor(props) {
	    super(props);

	    this.state = {
				subscription: {
					raids: Meteor.subscribe('allRaids')
				}
	    };
	}

	raids() {
		return Raids.find().fetch().reverse();
	}

	render() {
		return(
			<div>
				<h3>{TAPi18n.__('Raids')}:</h3>

				{this.raids().map((raid) => <RaidListItem description={raid.description} address={raid.address} created={raid.createdOn.valueOf()} key={raid._id} />)}



			</div>
		)
	}
}
