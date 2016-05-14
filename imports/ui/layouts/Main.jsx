import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Sidebar from 'react-sidebar';
import SidebarContent from '../components/SidebarContent';

import MaterialTitlePanel from '../components/MaterialTitlePanel.jsx';


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

export default class Main extends Component {

	constructor(props) {
	    super(props);

	    this.state = {

	    };
	}

	getInitialState() {
    return {docked: false, open: false};
  }

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
        <span style={styles.headerMenuLinkText}> Redadas de Obama</span>
      </span>);

    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen.bind(this),
    };

    return (
      <Sidebar {...sidebarProps}>
        <MaterialTitlePanel title={contentHeader}>
          <div style={styles.content}>
            <p>
              This example will automatically dock the sidebar if the page
              width is above 800px (which is currently {'' + this.state.docked}).
            </p>
            <p>
              This functionality should live in the component that renders the sidebar.
              This way you're able to modify the sidebar and main content based on the
              responsiveness data. For example, the menu button in the header of the
              content is now {this.state.docked ? 'hidden' : 'shown'} because the sidebar
              is {!this.state.docked && 'not'} visible.
            </p>
          </div>
        </MaterialTitlePanel>
      </Sidebar>
    );
  }
}