import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} from 'react-native';
import Swiper from 'react-native-swiper';

var LoginView = require('./components/LoginView.js');
// var Signup = require('./components/signup.js');

var app = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.navigationContainer}
        initialRoute={{
          title: 'Savvy Shopper Login',
          component: LoginView,
        }} />
    );
  }
});

var styles = StyleSheet.create({
  navigationContainer: {
    flex: 1
  }
});

AppRegistry.registerComponent('app', () => app);