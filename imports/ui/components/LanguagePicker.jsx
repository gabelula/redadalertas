import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { TAPi18n } from 'meteor/tap:i18n';
import DropDownMenu from 'material-ui/DropDownMenu';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const styles = {
  customWidth: {
    width: 200,
  },
	main: {
		'float': 'right'
	},
	option: {
		'color': '#ffffff'
	}
};

export default class LanguagePicker extends TrackerReact(Component) {
	constructor(props) {
    super(props);
    this.state = {
			value: 1,
			lang: 'en'
		};
  }

  handleChange(event, index, lang) {
		this.setState({lang:lang});

		if ( this.state.lang === 'es' ) {
			// make english the language
			TAPi18n.setLanguage('en');
		} else if ( this.state.lang === 'en' ) {
			// Make spanish the language
			TAPi18n.setLanguage('es');

		}
	}

  render() {
    return (
      <div style={styles.main}>
        <SelectField value={this.state.lang} onChange={this.handleChange.bind(this)}>
          <MenuItem value='en' primaryText="English" />
          <MenuItem value='es' primaryText="Espanol" />
        </SelectField>
      </div>
    );
  }
}
