import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
} from 'react-native';

var LoginView = require('./components/LoginView.js');

class app extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.navigationContainer}
        initialRoute={{
          title: 'Savvy Shopper Login',
          component: LoginView,
        }} />
    );
  }
}

var styles = StyleSheet.create({
  navigationContainer: {
    flex: 1
  }
});

AppRegistry.registerComponent('app', () => app);