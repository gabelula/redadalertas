import 'babel-polyfill';
import 'react-toolbox/lib/commons.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import configureStore from './configureStore';

import App from './app/App.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const store = configureStore(browserHistory);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
		<Provider store={store} >
			<MuiThemeProvider>
				<Router
					history={history}
					>
					<Route path="/" component={App} />


				</Router>
			</MuiThemeProvider>
		</Provider>

	,document.getElementById('app'));
