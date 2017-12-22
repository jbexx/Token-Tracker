import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

export default class Token extends Component {
  constructor() {
    super()
  }

  render() {
    // display 24h high, low, volume, current bid/ask if possible.  graph?
    return (
      <View>
        <Text> hello </Text>
      </View>
    )
  }
}

Token.navigationOptions = {
  title: 'Details'
}

const styles = StyleSheet.create({
})