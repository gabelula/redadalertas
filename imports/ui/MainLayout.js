import React, { Component } from 'react';
import { Layout, Panel, NavDrawer, Sidebar } from 'react-toolbox';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class MainLayout extends Component {
  constructor(props) {
    super();
    
    state = {
      drawerActive: false,
      drawerPinned: false,
      sidebarPinned: false
    };

  }
 
  toggleDrawerActive() {
    this.setState({ drawerActive: !this.state.drawerActive });
  }

  toggleDrawerPinned() {
    this.setState({ drawerPinned: !this.state.drawerPinned });
  }

  toggleSidebar() {
    this.setState({ sidebarPinned: !this.state.sidebarPinned });
  }

  render() {
    return (
      <ReactCSSTransitionGroup>
        <Layout>
          <NavDrawer
            active={this.state.drawerActive}
            pinned={this.state.drawerPinned}
            permanentAt='xxxl'
            onOverlayClick={this.toggleDrawerActive}
          >
            <Sidebar />
          </NavDrawer>

          <Panel>
            <h1>Header will go here</h1>

            {this.props.children}

          </Panel>
        </Layout>
      </ReactCSSTransitionGroup>
    )
  }
}

