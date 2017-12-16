import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import { Provider } from 'react-redux';
import Store from '../../Store';
import Crypto from '../Crypto/CryptoContainer';

export default class App extends Component {
  render() {
    return (
      <Provider store={ Store } >
        <View style={ styles.app }>
          <Crypto />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: '#171717'
  }
})










// import React, { Component } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet
// } from 'react-native';

// import { Provider } from 'react-redux';
// // import { addNavigationHelpers, StackNavigator } from 'react-navigation';
// // import Store from '../../Store';
// import {
//   createStore,
//   applyMiddleware,
//   combineReducers
// } from 'redux';
// import { composeWithDevTools } from 'remote-redux-devtools';
// import promise from 'redux-promise';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// import RootReducer from '../../Reducers/index';
// // import Crypto from '../Crypto/CryptoContainer';
// import AppWithNavigationState from '../../appNavigator';

// // const AppNavigator = StackNavigator(AppWithNavigationState);
// const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Crypto'));
// const navReducer = (state = initialState, action) => {
//   const nextState = AppNavigator.router.getStateForAction(action, state);
//   return nextState || state;
// }

// const appReducer = combineReducers({
//   nav: navReducer,
//   RootReducer
// },
//   composeWithDevTools(
//     applyMiddleware( thunk, promise, logger )
//   )
// );

// // class App extends Component {
// //   render() {
// //     return(
// //       <AppNavigator navigation={ addNavigationHelpers({
// //         dispatch: this.props.dispatch,
// //         state: this.props.nav
// //       }) } />
// //     )
// //   }
// // }

// const mapStateToProps = state => ({
//   nav: state.nav
// });

// // const AppWithNavigationState = connect(mapStateToProps)(App);
// const store = createStore(appReducer);

// export default class Root extends Component {
//   render() {
//     return (
//       <Provider store={ Store } >
//         <View style={ styles.app }>
//           <AppWithNavigationState />
//         </View>
//       </Provider>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   app: {
//     backgroundColor: '#171717'
//   }
// })