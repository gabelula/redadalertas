import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react';
import {mount} from 'react-mounter';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { loginUser } from '../../api/users/methods.js';


const style = {
  margin: 12,
};
//const Raids = Meteor.subscribe('raids.public');

export default class Login extends TrackerReact(React.Component) {

	constructor(props) {
	    super(props);

	    this.state = {

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

	render() {

		return (
				<div>
					<form onSubmit={this.handleLogin}>
						<TextField hintText="Correo Electronico" id="signup-email" />
						<TextField hintText="Contrasena" id="signup-pw" type="password" />

						<RaisedButton type="submit" className="login-submit" label="Ingresa" primary={true} style={style} />
					</form>

					<form onSubmit={this.handleRegister}>
						<TextField hintText="Correo Electronico" id="reg-email" />
						<TextField hintText="Contrasena" id="reg-pw" type="password" />
						<TextField hintText="Confirma Contrasena" id="reg-pw-2" type="password" />

						<RaisedButton type="submit" className="register-submit" label="Registrame" primary={true} style={style} />
					</form>

					<div id="login" className="alt-accounts-log-in-buttons"></div>
				</div>
		)
	}
}
