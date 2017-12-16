import { Component } from 'react'
import { AppRegistry } from 'react-native';
import App from './src/Components/App/App';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware
} from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import appReducer from './src/Reducers/index';
import AppWithNavigationState from './src/appNavigator';

class TokenTracker extends Component {
  Store = createStore(appReducer);

  render() {
    return(
      <Provider store={ Store }>
        <AppWithNavigationState />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('TokenTracker', () => App);
