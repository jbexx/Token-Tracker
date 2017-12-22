import { combineReducers } from 'redux';
import tokens from './CryptoReducer';
import filteredTokens from './SearchReducer';

// export default combineReducers({
//   tokens,
//   filteredTokens
// })

// import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../appNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
// const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Details');
const initialNavState = AppNavigator.router.getStateForAction(
  firstAction
);

const nav = (state = initialNavState, action) => {
  let nextState;
  switch (action.type) {
    case 'Crypto':
      nextState = AppNavigator.router.getStateForAction(
        state
      );
      break;
    case 'Token':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}

export default combineReducers({
  nav,
  tokens,
  filteredTokens
})