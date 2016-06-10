import React, { Component } from 'react';
import {mount} from 'react-mounter';
//import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';


export default class AlertStatus extends TrackerReact(Component) {

	constructor(props) {
	    super(props);

	    this.state = {
				subscription: {
					userData: Meteor.subscribe('userData')
				},
				getsAlerts: Meteor.user().getsAlerts
			};
	}

	componentWillUnmount() {
		this.state.subscription.userData.stop();
	}


	render() {
		console.log('Rendered AlertStatus: ' + this.state.getsAlerts);

		var showAlerts = Meteor.user().getsAlerts;

		var self = this;

		return (
				<div>
					<h4>
						{showAlerts ?
							<p>Alerts On</p>
						:
							<p>Alerts Off</p>
						}
					</h4>

				</div>
		)
	}
}
