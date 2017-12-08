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

    this.props.updateStore()
  }

  render() {
    console.log('state ', this.state)
    return (
      <View>
        <TextInput style={ styles.searchBox }
                   onChangeText={ text => this.updateTokens(text) }
                   value={ this.state.text }
                   editable={ true }
                   maxLength={ 40 } />
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