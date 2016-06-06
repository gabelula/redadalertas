import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import Sidebar from 'react-sidebar';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SidebarContent from '../components/SidebarContent';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MaterialTitlePanel from '../components/MaterialTitlePanel.jsx';
import { TAPi18n } from 'meteor/tap:i18n';
import LanguagePicker from '../components/LanguagePicker';
import DocMeta from 'react-doc-meta';


const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8
  },
	headerMenuLinkText: {
		textAlign: 'center',
		width: '100%',
		margin: '0px auto'
	},
  content: {
    padding: '16px',
  },
	fullWidth: {
		width: '100%'
	}
};

export default class Main extends TrackerReact(Component) {

	constructor(props) {
	    super(props);

	    // this.state = {
			//
	    // };
	}

	// getInitialState() {
  //   return {docked: false, open: false};
  // }

  componentWillMount() {
    const mql = window.matchMedia(`(min-width: 800px)`);
    mql.addListener(this.mediaQueryChanged.bind(this));
    this.setState({mql: mql, docked: mql.matches});
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged.bind(this));
  }

  onSetOpen(open) {
    this.setState({open: open});
  }

  mediaQueryChanged() {
    this.setState({docked: this.state.mql.matches});
  }

  toggleOpen(ev) {
    this.setState({open: !this.state.open});

    if (ev) {
      ev.preventDefault();
    }
  }

  render() {

		const sidebar = <SidebarContent />;

    const contentHeader = (
      <span style={styles.fullWidth}>
        {!this.state.docked &&
         <a onClick={this.toggleOpen.bind(this)} href="#" style={styles.contentHeaderMenuLink}>
					 <i className="fa fa-bars"></i>
         </a>}
        <span style={styles.headerMenuLinkText}>{TAPi18n.__('obamas_raids')}</span>
				<LanguagePicker />
      </span>);

    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen.bind(this),
    };

		var tags = [
      {name: "description", content: "Un mapa de las redadas que el partido Democrata patroniza."},
      {itemProp: "name", content: "Redadas De Obama"},
      {itemProp: "description", content: "Un mapa de las redadas que el partido Democrata y Obama patronizan."},
      {itemProp: "image", content: "https://dl.dropboxusercontent.com/u/16972085/cosecha/160513-redadas-de-obama.jpg"},
      {name: "twitter:card", content: "site"},
      {name: "twitter:site", content: "@cosecha_harvest"},
      {name: "twitter:title", content: "Redadas De Obama"},
      {name: "twitter:description", content: "Un mapa de las redadas que el partido Democrata y Obama patronizan."},
      {name: "twitter:creator", content: "@author_handle"},
      {name: "twitter:image", content: "https://dl.dropboxusercontent.com/u/16972085/cosecha/160513-redadas-de-obama.jpg"},
      {property: "og:title", content: "Redadas De Obama"},
      {property: "og:type", content: "site"},
      {property: "og:url", content: "http://www.redadasdeobama.com"},
      {property: "og:image", content: "https://dl.dropboxusercontent.com/u/16972085/cosecha/160513-redadas-de-obama.jpg"},
      {property: "og:description", content: "Un mapa de las redadas que el partido Democrata y Obama patronizan."},
      {property: "og:site_name", content: "Redadas de Obama"}
    ]

    return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<Sidebar {...sidebarProps}>
	        <MaterialTitlePanel title={contentHeader}>
	          <div style={styles.content}>
							<DocMeta tags={tags} />
							{this.props.yield}

	          </div>
	        </MaterialTitlePanel>
	      </Sidebar>
		  </MuiThemeProvider>

    );
  }
}
