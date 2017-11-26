import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

export default class Crypto extends Component {
  constructor() {
    super()
  }

  componentDidMount() {    
    this.props.getCryptoData()
  }

  render() {
    const { CryptoData } = this.props;
    let mappedCoins;

    if (CryptoData !== []) {
      mappedCoins = CryptoData.map( coin => (
        <Text>{ coin.name }</Text>
      ))
    }

    return (
        <View>
          <Text> Here </Text>
          { mappedCoins }
        </View>
    );
  }
}