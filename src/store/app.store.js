import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import { rootReduer } from '../reducers/root.reducer';

const dev = process.env.NODE_ENV === 'development';
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line
const composeEnhancers = dev && devtools ? devtools : compose;

const middleware = [];

if (dev) {
  middleware.push(logger);
}

export const store = createStore(rootReduer, composeEnhancers(applyMiddleware(...middleware)));
