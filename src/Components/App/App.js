import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import { Provider } from 'react-redux';
import Store from '../../Store';
import Crypto from '../Crypto/CryptoContainer';

export default class App extends Component {
  render() {
    return (
      <Provider store={ Store } >
        <View style={ styles.app }>
          <Crypto />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: '#222'
  }
})