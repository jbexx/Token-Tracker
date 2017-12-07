import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions
} from 'react-native';

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      text: 'Search'
    }
  }

  render() {
    return (
      <View>
        <TextInput style={ styles.searchBox }
                   onChangeText={ text => this.setState({ text })}
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