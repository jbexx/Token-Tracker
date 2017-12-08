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

  updateTokens = value => {
    const suggestions = this.trie.suggest(value)
    this.setState({ 
      text: value,
      suggestions
    })
    
    let newData = [];


    for (let j = 0; j < this.props.CryptoData.length; j++) {
      for (let i = 0; i < this.state.suggestions.length; i++) {
        if (this.props.CryptoData[j].name.toLowerCase() === this.state.suggestions[i].toLowerCase()) {
          newData.push(this.props.CryptoData[j])
        }
      }
    }
    console.log({newData})
    this.props.updateStore(newData)
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