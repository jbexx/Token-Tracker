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
    let newData = [];
    let i1 = 0;
    let i2 = 0;
    const i1Length = this.props.CryptoData.length;
    const i2Length = this.state.suggestions.length;

    while (i1 < i1Length) {
      console.log('the word ', this.state.suggestions[i2].toLowerCase())
      
      while (this.props.CryptoData[i1].name.toLowerCase() !== this.state.suggestions[i2].toLowerCase()) {
        i2++
        if (i2 >= i2Length) {
          i1++
          i2 = 0
        }
      }
      
      if (this.props.CryptoData[i1].name.toLowerCase() === this.state.suggestions[i2].toLowerCase()) {
        newData.push(this.props.CryptoData[i2])
      }
    }

    console.log({newData})
    // this.props.updateStore(newData)    
  }

  updateTokens = value => {
    const suggestions = this.trie.suggest(value)
    this.setState({ 
      text: value,
      suggestions
    })

    if (this.state.suggestions.length) {
      this.searchTokens()
    }
    
    



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