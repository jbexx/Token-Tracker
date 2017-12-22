import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import Token from '../Token/Token';

const mapStateToProps = state => {
  return {
    CryptoData: state.tokens
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Token);