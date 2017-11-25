import { Platform } from 'react-native';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import devTools from 'remote-redux-devtools';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import RootReducer from './Reducers/index';

const Store = createStore(
  RootReducer,
  compose(
    applyMiddleware( thunk, promise, logger ),
    devTools({
      name: Platform.OS,
      hostname: 'localhost',
      port: 8081,
      suppressConnectErros: false
    })
  )
);

export default Store;