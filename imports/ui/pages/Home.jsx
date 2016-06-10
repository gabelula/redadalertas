import React, { Component } from 'react';
import {mount} from 'react-mounter';
//import ReactDOM from 'react-dom';
import RaidMap from '../components/RaidMap.jsx';
import ReportForm from '../components/ReportForm.jsx';
import RaidList from '../components/RaidList.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';
import Login from './Login.jsx';


export default class Home extends TrackerReact(Component) {
	constructor(props) {
	    super(props);

	    this.state = {
				subscription: {

				}
	    };
	}

	componentWillUnmount() {

  }

	render() {

		return (
			<div>

				<RaidMap />

				{ Meteor.user() ?
					<ReportForm />
					:
					<AccountsUIWrapper />
				 }

				<RaidList />

			</div>
		)
	}
}
