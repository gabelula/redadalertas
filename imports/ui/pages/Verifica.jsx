import React, { Component } from 'react';
import {mount} from 'react-mounter';
//import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';
import AlertStatus from '../components/AlertStatus.jsx';

import AlertOptions from '../components/AlertOptions.jsx';

import { updateAlert } from '../../api/users/methods.js';

const thisUser = Meteor.user();

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
	button: {
		margin: 12
	}
};

export default class Verifica extends TrackerReact(Component) {

	constructor(props) {
	    super(props);

	    this.state = {
				subscription: {
					//userData: Meteor.subscribe('userData')
				}


	    };
	}

	componentWillUnmount() {
		//this.state.subscription.userData.stop();
  }

	render() {
		return (
			<div>
				<h2>
					Verifica
				</h2>






			</div>
		)
	}
}
