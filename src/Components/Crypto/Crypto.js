import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  StyleSheet
} from 'react-native';

import io from 'socket.io-client';

export default class Crypto extends Component {
  constructor() {
    super()

    this.state = {
      data: {}
    }

    this.unpack = this.unpack.bind(this)
  }

  componentDidMount() {    
    this.props.getCryptoData()
  }

  unpack = value => {
      const valuesArray = value.split("~");
      const arrayLength = valuesArray.length;
      if (arrayLength === 11 || arrayLength === 12 || arrayLength === 16) {
        console.log({valuesArray})
        
        let socketObject = {}
        switch (arrayLength) {
          case 11:
          socketObject = {
            from: valuesArray[2],
            to: valuesArray[3],
            price: valuesArray[5]
          }
  
          case 12:
          socketObject = {
            from: valuesArray[2],
            to: valuesArray[3],
            price: valuesArray[8]
          }

          case 16:
          socketObject = {
            from: valuesArray[2],
            to: valuesArray[3],
            price: valuesArray[5]
          }
        }  
        if (arrayLength === 11 || arrayLength === 12 || arrayLength === 16) {
          if (this.state.data.price !== socketObject.price) {
            // this.setState({
            //   data: socketObject
            // })
          }
        }
      }
  };

  render() {
    const { CryptoData } = this.props;
    const { from, to, price } = this.state.data;
    let mappedCoins;
    const socket = io.connect('wss://streamer.cryptocompare.com');
    const subscription = ['5~CCCAGG~ETH~USD'];
    socket.emit('SubAdd', { subs: subscription });
    socket.on('m', message => {
      const messageType = message.substring(0, message.indexOf("~"));
      if (messageType == 5) {
        this.unpack(message)
      }
    })

    return (
        <View style={ styles.container }>
          <Text style={ styles.header }> Token Tracker </Text>
          <FlatList data={ CryptoData }
                    renderItem={ coin => (
                      <View key={ coin.symbol } style={ styles.symbolPrice }>
                        <Text style={ styles.nameTxt }>{ coin.item.name }</Text>
                        <Text style={ coin.item.percent_change_24h > 0
                          ?
                          styles.greenTxt : styles.redTxt }>{ coin.item.price_usd }</Text>
                      </View>
                    )}
                    keyExtractor={ coin => coin.symbol } />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },

  header: {
    alignSelf: 'center',
    color: '#f2f2f2',
    fontSize: 17,
    marginBottom: 20
  },

  symbolPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: Dimensions.get('window').height/20,
    width: Dimensions.get('window').width,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10
  },

  greenTxt: {
    color: '#27FF93',
    fontSize: 17
  },

  redTxt: {
    color: '#FF2727',
    fontSize: 17
  },

  nameTxt: {
    color: '#f2f2f2',
    fontSize: 17
  }

})