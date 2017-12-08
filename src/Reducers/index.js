import { combineReducers } from 'redux';
import tokens from './CryptoReducer';
import filteredTokens from './SearchReducer';

export default combineReducers({
  tokens,
  filteredTokens
})