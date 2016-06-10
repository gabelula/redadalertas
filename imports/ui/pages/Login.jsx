import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react';
import {mount} from 'react-mounter';
//import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { loginUser } from '../../api/users/methods.js';
import { Accounts } from 'meteor/accounts-base';


const style = {
  margin: 12,
};
//const Raids = Meteor.subscribe('raids.public');

export default class Login extends TrackerReact(React.Component) {

	constructor(props) {
	    super(props);

	    this.state = {
				subscription: {
					userData: Meteor.subscribe('userData')
				}
	    };
	}

	componentDidMount() {
		//ReactDOM.render(<LogInButtonsDialog />, document.getElementById('login'));
	}

	handleLogin(e) {
		e.preventDefault();
		console.log('loggin in...');
		var user = document.getElementById("signup-email").value;
		var password = document.getElementById("signup-pw").value;

		// Meteor.loginWithPassword(user, password, function(err, res){
		// 	if(err){
		// 		console.log(err);
		// 	} else {
		// 		console.log(res);
		//
		// 	}
		// });

		loginUser.call({
			username: user,
			password: password
		}, (err) => {
			if (err && err.error) {
				console.log('Login failed...');
				return err.error;
			}
			console.log('Login was a success!');
		});

	}

	handleRegister(e) {
		e.preventDefault();

		console.log('Registering...');
	}

	render() {

		return (
				<div>
					<h3>Ingresa</h3>
					<form onSubmit={this.handleLogin}>
						<TextField hintText="Correo Electronico" id="signup-email" />
						<TextField hintText="Contrasena" id="signup-pw" type="password" />

						<RaisedButton type="submit" className="login-submit" label="Ingresa" primary={true} style={style} />
					</form>

					<hr />
					<h3>Crear una cuenta nueva</h3>
					<form onSubmit={this.handleRegister.bind(this)}>
						<TextField type="text" hintText="Correo Electronico" id="reg-email" />
						<TextField type="password" hintText="Contrasena" id="reg-pw" />
						<TextField type="password" hintText="Confirma Contrasena" id="reg-pw-2" />

						<RaisedButton type="submit" className="register-submit" label="Registrame" primary={true} style={style} />
					</form>

					<div id="login" className="alt-accounts-log-in-buttons"></div>
				</div>
		)
	}
}
