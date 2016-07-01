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
	        <a href="/" style={styles.sidebarLink}>{TAPi18n.__('Home')}</a>

					<div style={styles.divider} />
					<a id="logout" href="" style={Meteor.user() ? styles.sidebarLinkLoggedIn : styles.sidebarLinkLoggedOut} onClick={this.callLogout}>{TAPi18n.__('Logout')}</a>
	      </div>
	    </MaterialTitlePanel>
	  );
	}
}
