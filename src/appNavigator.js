import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Crypto from './Components/Crypto/Crypto';
import Coin from './Components/Coin/Coin';

export const AppNavigator = StackNavigator({
  Main: { screen: Crypto },
  Details: { screen: Coin },
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);