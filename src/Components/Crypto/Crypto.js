import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Dimensions,
  StyleSheet
} from 'react-native';

import Search from '../Search/SearchContainer';

import io from 'socket.io-client';

export default class Crypto extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      refreshing: false
    }

    this.unpack = this.unpack.bind(this)
    this.moreInfo = this.moreInfo.bind(this)
    // this.gatherTokens = this.gatherTokens.bind(this)
    // this.searchTokens = this.searchTokens.bind(this)
  }

  componentWillMount() {
    this.props.getCryptoData()
  }

  componentWillReceiveProps(nextProps) {
    // console.log({nextProps})
    // this.gatherTokens(nextProps, 'USDT')
  }

  moreInfo() {
    console.log('pressed')
  }
  // gatherTokens = (base, currency) => {
  //   const tokenKeys = Object.keys(base.CryptoData);
  //   const wantedTokens = tokenKeys.filter(token => token.split('_')[0] === currency)
  //   this.setState({
  //     data: wantedTokens.map( token => Object.assign({}, { pair: token }, base.CryptoData[token]))
  //   })
  // }

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
            this.setState({
              data: Object.assign(this.state.data, {price_usd: socketObject.price})
            })
          }
        }
      }
  };

  render() {
    const { CryptoData, filteredTokens, getCryptoData } = this.props;
    const { refreshing } = this.state;
    const socket = new WebSocket('wss://streamer.cryptocompare.com');

    socket.addEventListener('message', function (event) {
  });
    // const socket = io.connect('wss://streamer.cryptocompare.com');
    // const subscription = ['5~CCCAGG~ETH~USD'];
    // console.log({socket})
    // socket.emit('SubAdd', { subs: subscription });
    // socket.on('m', message => {
    //   const messageType = message.substring(0, message.indexOf("~"));
    //   if (messageType == 5) {
    //     this.unpack(message)
    //   }
    // })

    return (
        <View style={ styles.container }>
          <StatusBar barStyle={ 'light-content' }/>
          <Text style={ styles.header }> Token Tracker </Text>
          <Search/>
          <FlatList style={ styles.list }
                    data={ filteredTokens.length ? filteredTokens : CryptoData }
                    refreshing={ false }
                    onRefresh={ () => getCryptoData() }
                    renderItem={ coin => (
                      <TouchableOpacity activeOpacity={ .5 }
                                        onPress={ this.moreInfo }>
                      <View style={ styles.symbolPrice }>
                        <Text style={ styles.nameTxt }>{ coin.item.name }</Text>
                        <Text style={ coin.item.percent_change_24h > 0
                          ?
                          styles.greenTxt : styles.redTxt }>{ coin.item.price_usd }</Text>
                      </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={ coin => coin.id } />
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
    fontFamily: 'Ubuntu',    
    color: '#f2f2f2',
    fontSize: 20,
    marginBottom: 20
  },

  list: {
    height: Dimensions.get('window').height
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

  nameTxt: {
    color: '#f2f2f2',
    fontFamily: 'Ubuntu-Light',
    fontSize: 20
  },

  greenTxt: {
    color: '#27FF93',
    fontFamily: 'Ubuntu-Light',    
    fontSize: 20
  },

  redTxt: {
    color: '#FF0044',
    fontFamily: 'Ubuntu-Light',    
    fontSize: 20
  }

})