import React, { Component } from 'react';
import {mount} from 'react-mounter';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { sendSMS } from '../../api/sms/methods.js';

const style = {
  margin: 12,
};

export default class Send extends TrackerReact(Component) {
	constructor(props) {
	    super(props);

	    this.state = {
				subscription: {

				}
	    };
	}

	componentWillUnmount() {

  }

	handleSubmit(e) {
		e.preventDefault();

		var phone = document.getElementById("cel-number").value;
		var message = document.getElementById("sms-message").value;

		sendSMS.call({
			recipient: phone,
			message: message
		}, (err) => {
			if (err && err.error) {
				return err.error;
			}
			console.log('SMS Sending was a success: ');
		});

		document.getElementById("cel-number").value = '';
		document.getElementById("sms-message").value = '';
	}

	render() {

		return (
			<div>

			<h2>Send an SMS</h2>
			<form onSubmit={this.handleSubmit.bind(this)}>
				<TextField hintText="Cellular Number" id="cel-number" />
				<TextField hintText="Message" id="sms-message" />

				<RaisedButton type="submit" className="report-submit" label="Reporta" backgroundColor="rgb(121, 9, 9)" labelColor="#ffffff" style={style} />
			</form>

			</div>
		)
	}
}
