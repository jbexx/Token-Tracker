import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import { Provider } from 'react-redux';
import Store from '../../Store';
import Crypto from '../Crypto/CryptoContainer';

export default class App extends Component {
  render() {
    return (
      <Provider store={ Store } >
        <View>
          <Crypto />
        </View>
      </Provider>
    );
  }
}