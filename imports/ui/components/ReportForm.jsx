import React, { Component } from 'react';
import { mount } from 'react-mounter';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

import { Raids } from '../../api/raids/raids.js';
import { addRaid } from '../../api/raids/methods.js';
import check from 'meteor/check';
import { Geolocation } from 'meteor/mdg:geolocation';

const style = {
  margin: 12,
};

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

export default class ReportForm extends TrackerReact(Component) {

	constructor(props) {
	    super(props);
	    this.state = {
				subscription: {
					raids: Meteor.subscribe('allRaids')
				},
				geolocation: Geolocation.latLng(),
				useGeo: true
	    };
	}

	componentDidMount() {
		var geoLocation = Geolocation.latLng();
		this.setState({geoLocation: geoLocation});
	}

	raids() {
		return Raids.find().fetch();
	}

	insertRaid(e) {
		e.preventDefault();

		const geocoder = new google.maps.Geocoder();

    const address = document.getElementById("txtAddress").value;
		//check (address, String);
		const description = document.getElementById("txtDescription").value;
		//check (description, String);

		geocoder.geocode({ 'address': address }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				const latitude = results[0].geometry.location.lat();
				const longitude = results[0].geometry.location.lng();

				addRaid.call({
					address,
					description,
					createdOn: new Date(),
					geoLocation: { lat: latitude, lng: longitude },
					media: {}
				}, (err) => {
					if (err && err.error) {
						return err.error;
					}
					// console.log('Submission was a success: ' + data);
				});
			} else {
				alert("Request failed. Could not GeoCode the location based on your input. Try submitting a Zip Code");
			}
		});

		// Clear values
		document.getElementById("txtAddress").value = '';
		document.getElementById("txtDescription").value = '';

	}

	componentWillUnmount() {
		this.state.subscription.raids.stop();
	}

	handleGeoChange() {
		this.setState({useGeo: !this.state.useGeo});
	}

	renderGeo() {
		return (<TextField hintText="Codigo Postal" id="txtAddress" />);
	}


	render() {
		var geoLocation = Geolocation.latLng();
		console.log(geoLocation);

		var self = this;

		return (
			<div>
				<form onSubmit={this.insertRaid}>
					<TextField hintText="Describe la redada" id="txtDescription" />
					<Toggle
						label="Usa datos de lugar de tu telefono/computadora"
						labelPosition="right"
						style={styles.toggle}
						id="alert-status"
						defaultToggled={this.state.useGeo}
						onToggle={this.handleGeoChange.bind(this)} />

					{this.state.useGeo ? '' : this.renderGeo()}

					<RaisedButton type="submit" className="report-submit" label="Reporta" backgroundColor="rgb(121, 9, 9)" labelColor="#ffffff" style={style} />
				</form>


			</div>
		)
	}
}
