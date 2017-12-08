import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCryptoData, setStore } from '../../Actions/actions';
import Crypto from '../Crypto/Crypto';

const mapStateToProps = state => {
  return {
    CryptoData: state.tokens,
    filteredTokens: state.filteredTokens
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getCryptoData },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Crypto);