import React, { Component } from 'react';
import { mount } from 'react-mounter';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Paper from 'material-ui/Paper';
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
import Snackbar from 'material-ui/Snackbar';

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
  },
	paper: {
		padding: "15px",
		marginTop: "10px"
	}
};

const superGeo = Geolocation.latLng();

export default class ReportForm extends TrackerReact(Component) {

	constructor(props) {
	    super(props);
	    this.state = {
				open: false,
				subscription: {
					raids: Meteor.subscribe('allRaids')
				},
				geolocation: Geolocation.latLng(),
				useGeo: true,
				anyDetained: 'unsure',
				knowHappened: 'news',
				message: TAPi18n.__('form_success')
	    };
	}

	componentDidMount() {
		var geoLocation = Geolocation.latLng();
		this.setState({geoLocation: geoLocation});
	}

	handleRequestClose() {
    this.setState({
      open: false,
    });
  }

	raids() {
		return Raids.find().fetch();
	}

	chooseAnyDetained(e,value) {
		e.preventDefault();
		this.setState({ anyDetained: value });
	}

	chooseKnowHap( e,value ) {
		e.preventDefault();
		this.setState({ knowHappened: value });
	}

	insertRaid(e) {
		e.preventDefault();
		console.log(superGeo);

		const geocoder = new google.maps.Geocoder();

		const self = this;

		const dateOccurred = document.getElementById("date-occurred").value;
		const anyDetained = this.state.anyDetained;
		const description = document.getElementById("txtDescription").value;
		const knowHappened = this.state.knowHappened;
		const knowHappenedText = document.getElementById("know-happened-text").value;
		const address = document.getElementById("txtAddress").value;
		const phone = document.getElementById("txtPhone").value;
		const verified = false;


		geocoder.geocode({ 'address': address }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				const latitude = results[0].geometry.location.lat();
				const longitude = results[0].geometry.location.lng();

				addRaid.call({
					verified,
					dateOccurred,
					anyDetained,
					knowHappened,
					knowHappenedText,
					address,
					description,
					phone,
					createdOn: new Date(),
					geoLocation: { lat: latitude, lng: longitude },
					media: {}
				}, (err) => {
					if (err && err.error) {
						self.setState( { message: err.error } );
						self.setState( { open: true } );
						return err.error;
					}
					// console.log('Submission was a success: ' + data);
					self.setState( { open: true } );
				});
			} else {
				self.setState( { message: 'Could not GeoCode the location based on your input. Try submitting a Zip Code' } );
				//alert("Request failed. Could not GeoCode the location based on your input. Try submitting a Zip Code");
				//this.showSnackBar("Request failed. Could not GeoCode the location based on your input. Try submitting a Zip Code").bind(this);
				self.setState( { open: true } );
			}
		});

		//this.setState( { open: true } );

		// Clear values
		document.getElementById("txtAddress").value = '';
		document.getElementById("txtDescription").value = '';
		document.getElementById("date-occurred").value = '';
		document.getElementById("know-happened-text").value = '';
		document.getElementById("txtPhone").value = '';

	}

	showSnackBar(message) {
		this.setState( { message: message } );
		this.setState( { open: true } );
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
			<Paper style={styles.paper} zDepth={3} >
				<h1>{TAPi18n.__('report_a_raid')}</h1>
				<form onSubmit={this.insertRaid.bind(this)}>
					<DatePicker autoOk={true} hintText={TAPi18n.__('date_raid_occurred')} id="date-occurred" name="date-occurred" />

					<p>{TAPi18n.__('was_anybody_detained')}</p>
					<RadioButtonGroup name="any-detained" defaultSelected="unsure" id="any-detained" name="any-detained" onChange={this.chooseAnyDetained.bind(this)}>

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

					<TextField hintText={TAPi18n.__('describe_the_raid')} id="txtDescription" name="txtDescription" multiLine={true}
      rows={2} fullWidth={true} />

					<p>{TAPi18n.__('how_know_happened')}</p>

					<RadioButtonGroup name="know-happened" defaultSelected="news" id="know-happened-option" name="know-happened-option" onChange={this.chooseKnowHap.bind(this)}>

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

					<TextField hintText={TAPi18n.__('how_know_happened')} id="know-happened-text" multiLine={true}
      rows={2} fullWidth={true} name="know-happened-text"/>

		<TextField hintText={TAPi18n.__('zip_code')} id="txtAddress" name="txtAddress" />

					<TextField hintText={TAPi18n.__('phone_number_optional')} id="txtPhone" name="txtPhone" />

					<RaisedButton type="submit" className="report-submit" label={TAPi18n.__('report_a_raid')} backgroundColor="rgb(121, 9, 9)" labelColor="#ffffff" style={style} />
				</form>

			</Paper>
			<Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
			</div>
		)
	}
}
