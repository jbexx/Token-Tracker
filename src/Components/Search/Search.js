import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions
} from 'react-native';

import Trie from '../../utils/trie';
import { getCryptoData } from '../../Actions/actions';

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
    const { CryptoData, updateStore, getCryptoData } = this.props;
    const { suggestions } = this.state;
    // .sort alters source of truth?
    const altData = CryptoData;
    const sortedData = altData.sort( (a, b) => {
      if (a.id < b.id) { return -1 }
      if (a.id > b.id) { return 1 }
      return 0
    });
    const sortedSug = suggestions.sort() || []
    const newData = [];
    let i1 = 0;
    let i2 = 0;
    const i1Length = sortedData.length;
    const i2Length = sortedSug.length;

    if (i2Length && i2Length !== i1Length) {

      while (sortedData[i1].name.toLowerCase() !== sortedSug[i2].toLowerCase() && i1 < i1Length) {
        i1++
        
        if (sortedData[i1].name.toLowerCase() === sortedSug[i2].toLowerCase()) {
          newData.push(sortedData[i1])
          i2++
        }

        if (newData.length === i2Length) {
          return updateStore(newData)
        }
      }
    } else {
      return updateStore([])
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
    color: '#bbb',
    fontSize: 15,
    height: 30,
    marginBottom: 20,
    paddingLeft: 20,
    width: Dimensions.get('window').width - 10
  }
})