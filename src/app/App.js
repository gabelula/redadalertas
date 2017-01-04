import React, { Component } from 'react';
import { AppBar, Checkbox, IconButton } from 'react-toolbox';
import { Layout, NavDrawer, Panel } from 'react-toolbox';
import AppSidebar from '../shared-components/sidebar/AppSidebar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleDrawerActive, toggleDrawerPinned } from './actions';


class App extends Component {

    toggleDrawerActive = () => {
				this.props.toggleDrawerActive();
    };

    toggleDrawerPinned = () => {
				this.props.toggleDrawerPinned();
    }



    render() {
				const { drawerActive, drawerPinned, toggleDrawerActive, toggleDrawerPinned } = this.props;

        return (
            <Layout>
                <NavDrawer active={drawerActive}
                    pinned={drawerPinned} permanentAt='xl'
                    onOverlayClick={ toggleDrawerActive }>
                    <AppSidebar />
                </NavDrawer>
                <Panel>
                    <AppBar><IconButton icon='menu' inverse={ true } onClick={ toggleDrawerActive }/></AppBar>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                        <h1>Hello World</h1>
                        <p>Main content goes here.</p>
                    </div>
                </Panel>

            </Layout>
        );
    }
}

function mapStateToProps( state ) {
  return {
		drawerActive: state.app.drawerActive,
		drawerPinned: state.app.drawerPinned
  }
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators({
		toggleDrawerActive: toggleDrawerActive,
		toggleDrawerPinned: toggleDrawerPinned
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps)(App);
