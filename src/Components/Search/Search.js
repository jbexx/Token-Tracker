import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions
} from 'react-native';

import Trie from '../../utils/trie';

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      text: 'Search',
      suggestions: []
    }

    this.trie = {}
    this.updateTokens = this.updateTokens.bind(this);
    this.searchTokens = this.searchTokens.bind(this);
  }

  // create an action that will update cryptodata in store
  // with filtered results from this.trie.suggest()
  // want action to send updated / filtered array of store
  // and then set that new array to store as the new cryptodata

  componentWillReceiveProps(nextprops) {
    const trie = new Trie()
    trie.populate(
      nextprops.CryptoData.map( token => token.name )
    )
    this.trie = trie
  }

  searchTokens = () => {
    const { CryptoData } = this.props;
    const { suggestions } = this.state;
    let newData = [];
    let i1 = 0;
    let i2 = 0;
    let counter = 0;
    const i1Length = CryptoData.length;
    const i2Length = suggestions.length;
    console.log('i2 length out of while', i2Length)
    

    while (i1 < i1Length && i2Length ) {
      counter++
      // console.log('i1 ', i1)
      console.log('i2 ', i2)
      // console.log('the array ', CryptoData[100])
      // console.log('the token ', CryptoData[i1].name.toLowerCase())
      console.log('i2 length', i2Length)
      // console.log('newdata length', newData.length)
      // console.log('undefined? ', i1Length)
      console.log('sgstn at i2 ', suggestions[i2].toLowerCase())

      while (CryptoData[i1].name.toLowerCase() !== suggestions[i2].toLowerCase()) {
        i2++
        if (i2 > i2Length) {
          i1++
          i2 = 0
        }
        break;
      }
      
      while (CryptoData[i1].name.toLowerCase() === suggestions[i2].toLowerCase()) {
        newData.push(CryptoData[i1])
        i1++
        i2 = 0
        break;
      }

      if (newData.length === i2Length) {
      console.log('newdata length when return', newData.length)
      
        console.log({counter})
        return newData
      }
    }

    // console.log({newData})
    // this.props.updateStore(newData)    
  }

  updateTokens = value => {
    const suggestions = this.trie.suggest(value)
    this.setState({ 
      text: value,
      suggestions
    },
    () => {
      console.log('search tokens ', this.searchTokens())})

    // if (this.state.suggestions.length) {
    //   console.log('search tokens ', this.searchTokens())
    // }
    
    



    // for (let j = 0; j < this.props.CryptoData.length; j++) {
    //   for (let i = 0; i < this.state.suggestions.length; i++) {
    //     if (this.props.CryptoData[j].name.toLowerCase() === this.state.suggestions[i].toLowerCase()) {
    //       newData.push(this.props.CryptoData[j])
    //     }
    //   }
    // }

    // this.props.updateStore(newData)
  }

  render() {
    console.log('state ', this.state)
    return (
      <View>
        <TextInput style={ styles.searchBox }
                   onFocus={ () => this.setState({ text: '' }) }
                   onChangeText={ text => this.updateTokens(text) }
                   value={ this.state.text }
                   editable={ true }
                   maxLength={ 20 } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchBox: {
    color: '#f2f2f2',
    fontSize: 15,
    height: 30,
    marginBottom: 20,
    paddingLeft: 20,
    width: Dimensions.get('window').width - 10
  }
})