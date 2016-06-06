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
import { TAPi18n } from 'meteor/tap:i18n';
import DatePicker from 'material-ui/DatePicker';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

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
	},
  radioButton: {
    marginBottom: 16,
  }
};

const superGeo = Geolocation.latLng();

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
		console.log(superGeo);

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

		return (
			<div>
				<h1>{TAPi18n.__('report_a_raid')}</h1>
				<form onSubmit={this.insertRaid}>
					<DatePicker hintText={TAPi18n.__('date_raid_occurred')} />
					<p>{TAPi18n.__('was_anybody_detained')}</p>
					<RadioButtonGroup name="any-detained" defaultSelected="">

		      <RadioButton
		        value="yes"
		        label={TAPi18n.__('yes')}
		        style={styles.radioButton}
		      />
		      <RadioButton
		        value="no"
		        label={TAPi18n.__('no')}
		        style={styles.radioButton}
		      />
					<RadioButton
						value="unsure"
						label={TAPi18n.__('unsure')}
						style={styles.radioButton}
					/>

		    	</RadioButtonGroup>

					<TextField hintText={TAPi18n.__('describe_the_raid')} id="txtDescription" multiLine={true}
      rows={2} fullWidth={true} />

					<p>{TAPi18n.__('how_know_happened')}</p>

					<RadioButtonGroup name="know-happened" defaultSelected="">

						<RadioButton
							value="news"
							label={TAPi18n.__('news_report')}
							style={styles.radioButton}
						/>
						<RadioButton
							value="first-hand"
							label={TAPi18n.__('first_hand_account')}
							style={styles.radioButton}
						/>
						<RadioButton
							value="second-hand"
							label={TAPi18n.__('heard_from_someone_else')}
							style={styles.radioButton}
						/>

					</RadioButtonGroup>

					<TextField hintText={TAPi18n.__('how_know_happened')} id="txtHappened" multiLine={true}
      rows={2} fullWidth={true} />

					<TextField hintText={TAPi18n.__('zip_code')} id="txtAddress" />

					<TextField hintText={TAPi18n.__('phone_number_optional')} id="txtPhone" />

					<RaisedButton type="submit" className="report-submit" label={TAPi18n.__('report_a_raid')} backgroundColor="rgb(121, 9, 9)" labelColor="#ffffff" style={style} />
				</form>


			</div>
		)
	}
}
