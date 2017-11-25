import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCryptoData, setStore } from '../../Actions/actions';
import Crypto from '../Crypto/Crypto';

const mapStateToProps = state => {
  return {
    CryptoData: state.crypto
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getCryptoData, setStore },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Crypto);