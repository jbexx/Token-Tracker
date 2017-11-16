import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import { Provider } from 'react-redux';
import Store from '../../Store';

export default class App extends Component {
  render() {
    return (
      <Provider store={ Store } >
        <View>
          <Text>
            Dope Crypto App
          </Text>
        </View>
      </Provider>
    );
  }
}