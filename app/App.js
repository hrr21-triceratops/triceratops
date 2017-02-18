import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import LoginView from './components/LoginView';
import SignupView from './components/SignupView';
import ShopperView from './components/ShopperView';
import ExpertView from './components/ExpertView';

class app extends Component {

  renderScene(route, navigator) {
    if (route.name === 'Login') {
      return <LoginView navigator={navigator} />
    }
    if (route.name === 'Signup') {
      return <SignupView navigator={navigator} />
    }
    if (route.name === 'Shopper') {
      return <ShopperView navigator={navigator} />
    }
    if (route.name === 'Expert') {
      return <ExpertView navigator={navigator} />
    }
  }

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ name: 'Login' }}
        renderScene={ this.renderScene }
      />
    );
  }
}

AppRegistry.registerComponent('app', () => app);