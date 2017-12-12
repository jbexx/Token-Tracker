import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateStore, getCryptoData } from '../../Actions/actions';
import Search from './Search';

const mapStateToProps = state => {
  return {
    CryptoData: state.tokens,
    filteredTokens: state.filteredTokens
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { updateStore, getCryptoData },
    dispatch
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);