import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Crypto from './Components/Crypto/Crypto';
import Token from './Components/Token/Token';

export const AppNavigator = StackNavigator({
  Main: { screen: Crypto },
  Details: { screen: Token },
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);