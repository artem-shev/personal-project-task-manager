import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from 'sagas/root.saga';
import { rootReduer } from '../reducers/root.reducer';


const dev = process.env.NODE_ENV === 'development';
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line
const composeEnhancers = dev && devtools ? devtools : compose;

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  sagaMiddleware,
];

if (dev) {
  middleware.push(logger);
}

export const store = createStore(rootReduer, composeEnhancers(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);
