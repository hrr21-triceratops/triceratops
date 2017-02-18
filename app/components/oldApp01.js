import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
} from 'react-native';
import LoginView from './components/LoginView';

class app extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Savvy Shopper Login', index: 0 }}
        renderScene={(route, navigator) =>
          <LoginView
            title={route.title}

            onForward={() => {
              const nextIndex = route.index + 1;
              navigator.push({
                title: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}

            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        }
      />
    )
  }
}

// AppRegistry.registerComponent('app', () => app);