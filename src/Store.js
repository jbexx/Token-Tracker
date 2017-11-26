import { Platform } from 'react-native';
import {
  createStore,
  applyMiddleware
} from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import RootReducer from './Reducers/index';

const Store = createStore(
  RootReducer,
  composeWithDevTools(
    applyMiddleware( thunk, promise, logger )
  )
);

export default Store;