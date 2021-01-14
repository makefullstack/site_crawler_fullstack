import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './saga/rootSaga';

import App from './app';
import rootReducer from './reducer';

axios.defaults.baseURL = 'http://localhost:8000';

const env = 'development';

const sagaMiddleware = createSagaMiddleware();
const middleWare = applyMiddleware(sagaMiddleware, logger);
const store = createStore(rootReducer, env === 'product' ? middleWare : composeWithDevTools(middleWare));
sagaMiddleware.run(rootSaga);

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));