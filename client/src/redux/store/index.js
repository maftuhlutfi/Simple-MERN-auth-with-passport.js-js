import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import allSagas from '../sagas';

import allReducers from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

export const store = createStore(allReducers, composeWithDevTools(
	applyMiddleware(...middleware)
));

sagaMiddleware.run(allSagas);