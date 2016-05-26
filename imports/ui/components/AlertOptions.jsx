import React, { Component } from 'react';
import {mount} from 'react-mounter';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import AlertStatus from '../components/AlertStatus.jsx';
import Snackbar from 'material-ui/Snackbar';

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

const dataSource = ['12345', '23456', '34567', 'one', 'two', 'three', 'thirty', 'verizon', 't-mobile', 'cricket'];

export default class AlertOptions extends TrackerReact(Component) {

	constructor(props) {
	    super(props);

	    this.state = {
				subscription: {
					userData: Meteor.subscribe('userData')
				},
				getsAlerts: false ,
				mobileCarrier: 1,
				open: false,
				dataSource: [
					'AT&T',
					'Virgin Mobil',
					'MetroPCS',
					'Sprint',
					'Verizon',
					'T-Mobile',
					'Cricket'
				],
				thisUser: Meteor.user()
	    };
	}

	componentWillUnmount() {
		this.state.subscription.userData.stop();
  }

	handleAlertChange() {
		this.setState({getsAlerts: !this.state.getsAlerts});
		//
		// updateAlert.call(true, (err) => {
		// 	if (err && err.error) {
		// 		return err.error;
		// 	}else{
		// 		console.log('Submission was a success: ');
		// 	}
		// });
	}

	handleUpdateInput (value) {
	    this.setState({
	      dataSource: [
	        value,
	        value + value,
	        value + value + value,
	      ],
	    });
	}

	saveAlertInfo(e) {
		Meteor.users.update(Meteor.userId(), {$set: {"alerts.getsAlerts": this.state.getsAlerts}});


		this.setState({
      open: true,
    });
	}

	handleRequestClose() {
		this.setState({
      open: false,
    });
	}

	render() {
		console.log(this.state.getsAlerts);

		return (
			<div>

						<Toggle
							label="Recibe alertas de redadas"
							labelPosition="right"
							style={styles.toggle}
							id="alert-status"
							defaultToggled={this.state.getsAlerts}
							onToggle={this.handleAlertChange.bind(this)} />
						<br />
						<TextField hintText="Tu numero celular" id="cel-number" />
						<br />
						<AutoComplete
		          dataSource={this.state.dataSource}
		          floatingLabelText="Tu Compañia Celular"
	      			filter={AutoComplete.fuzzyFilter}
							maxSearchResults={5}

		        />
						<br />
						<RaisedButton onClick={this.saveAlertInfo.bind(this)} type="submit" className="report-submit" label="Inscribir a Alertas" primary={true} style={styles.button} />



				<Snackbar
					open={this.state.open}
					message="Tu informacion de Alertas ha sido grabado."
					autoHideDuration={4000}
					onRequestClose={this.handleRequestClose.bind(this)} />



			</div>
		)
	}
}
