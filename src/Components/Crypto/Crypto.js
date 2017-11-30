import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  StyleSheet
} from 'react-native';

const io = require('socket.io-client')('wss://api.poloniex.com');
require('socket.io-wamp')(io);

export default class Crypto extends Component {
  constructor() {
    super()

    this.state = {
      data: []
    }

    this.unpack = this.unpack.bind(this)
    this.gatherTokens = this.gatherTokens.bind(this)
  }

  componentDidMount() {
    this.props.getCryptoData()
  }

  componentWillReceiveProps(nextProps) {
    console.log({nextProps})
    this.gatherTokens(nextProps, 'USDT')
  }

  gatherTokens = (base, currency) => {
    const tokenKeys = Object.keys(base.CryptoData);
    const wantedTokens = tokenKeys.filter( token => token.split('_')[0] === currency)
    this.setState({
      data: wantedTokens.map( token => Object.assign({}, { pair: token }, base.CryptoData[token]))
    })
  }

  unpack = value => {
      const valuesArray = value.split("~");
      const arrayLength = valuesArray.length;
      if (arrayLength === 11 || arrayLength === 12 || arrayLength === 16) {
        // console.log({valuesArray})
        
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
            this.setState({
              data: Object.assign(this.state.data, {price_usd: socketObject.price})
            })
          }
        }
      }
  };

  render() {
    const { CryptoData } = this.props;

    const socket = io.connect();
    console.log({socket})
    socket.on('connect', client => {
      console.log({client})
    })

    return (
        <View style={ styles.container }>
          <Text style={ styles.header }> Token Tracker </Text>
          <FlatList data={ this.state.data }
                    renderItem={ coin => (
                      <View style={ styles.symbolPrice }>
                        <Text style={ styles.nameTxt }>{ coin.item.pair }</Text>
                        <Text style={ coin.item.percentChange > 0
                          ?
                          styles.greenTxt : styles.redTxt }>{ coin.item.last }</Text>
                      </View>
                    )}
                    keyExtractor={ coin => coin.pair } />
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