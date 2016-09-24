import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import recycleState from 'redux-recycle';
import { reducer as appReducer } from './app';

//import { reducer as appReducer } from './app';

//import rootSaga from './rootSaga';

const reducer = combineReducers(
  {
		app: appReducer,
    routing: routerReducer

  }
);

export default function configureStore(browserHistory, initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [ sagaMiddleware, routerMiddleware(browserHistory)];


	if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();
    middlewares.push(logger);
  }


  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
			typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ));

  //sagaMiddleware.run(rootSaga);
  return store;
}
