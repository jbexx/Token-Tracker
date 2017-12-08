import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateStore } from '../../Actions/actions';
import Search from './Search';

const mapStateToProps = state => {
  return {
    CryptoData: state.tokens,
    filteredTokens: state.filteredTokens
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { updateStore },
    dispatch
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);