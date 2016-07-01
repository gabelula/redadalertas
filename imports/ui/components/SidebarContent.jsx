import React, { Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MaterialTitlePanel from './MaterialTitlePanel';
import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import LanguagePicker from './LanguagePicker';

const styles = {
  sidebar: {
    width: 256,
    height: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
  },
	sidebarLinkLoggedOut: {
    display: 'block',
    padding: '16px 0px',
    color: '#c8c8c8',
    textDecoration: 'none',
  },
	sidebarLinkLoggedIn: {
		display: 'block',
    padding: '16px 0px',
    color: '#806565',
    textDecoration: 'none',
		fontWeight: '800'
	},
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
  content: {
    padding: '16px',
    height: '100%',
    backgroundColor: 'white',
  },
	help: {
		marginTop: '10px',
		fontWeight: 'bold'
	}
};

export default class SidebarContent extends TrackerReact(Component) {
	constructor(props) {
		super(props);

		this.state = {};
	}

	callLogout(e) {
		e.preventDefault();
		Meteor.logout();
	}

	render() {
		return (
	    <MaterialTitlePanel title="Menu" style={styles.sidebar}>
	      <div style={styles.content}>
					<LanguagePicker />

					<div style={styles.divider} ></div>


					<a href="/" style={styles.sidebarLink}>{TAPi18n.__('Map')}</a>
	        <a href="/reporta" style={styles.sidebarLink}>{TAPi18n.__('Report')}</a>
					<a href="/verifica" style={styles.sidebarLink}>{TAPi18n.__('Verify')}</a>
					<a href="/alertas" style={styles.sidebarLink}>{TAPi18n.__('Alerts')}</a>

					<div style={styles.divider} ></div>
						<a id="logout" href="" style={Meteor.user() ? styles.sidebarLinkLoggedIn : styles.sidebarLinkLoggedOut} onClick={this.callLogout}>{TAPi18n.__('Logout')}</a>


					<div style={styles.divider} ></div>
					<div style={styles.help}>
						<a href="https://github.com/Cosecha/redadas-de-obama" target="_blank" style={styles.sidebarLink}>{TAPi18n.__('Help-Develop')}</a>
					</div>

				</div>

	    </MaterialTitlePanel>
	  );
	}
}
