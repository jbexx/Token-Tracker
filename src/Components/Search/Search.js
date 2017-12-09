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

  componentWillReceiveProps(nextprops) {
    const trie = new Trie()
    trie.populate(
      nextprops.CryptoData.map( token => token.name )
    )
    this.trie = trie
  }

  searchTokens = () => {
    const { CryptoData, updateStore } = this.props;
    const { suggestions } = this.state;
    const newData = [];
    let i1 = 0;
    let i2 = 0;
    const i1Length = CryptoData.length;
    const i2Length = suggestions.length;

    if (i2Length) {

      while (CryptoData[i1].name.toLowerCase() !== suggestions[i2].toLowerCase() && i1 < i1Length) {
        i1++

        if (CryptoData[i1].name.toLowerCase() === suggestions[i2].toLowerCase()) {
          newData.push(CryptoData[i1])
          i1 = 0
          i2++
        }

        if (newData.length === i2Length) {
          return updateStore(newData)
        }
      }
    }
  }

  updateTokens = value => {
    const suggestions = this.trie.suggest(value)
    this.setState({ 
      text: value,
      suggestions
    },
    () => this.searchTokens())
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