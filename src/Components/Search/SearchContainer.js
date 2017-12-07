import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Search from './Search';

const mapStateToProps = state => {
  return {
    CryptoData: state.crypto
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);