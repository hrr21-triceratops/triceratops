////////////////////////////
///// app dependencies /////
////////////////////////////

import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Swiper from 'react-native-swiper';

var LoginView = require('./components/LoginView.js');
var Signup = require('./components/signup.js');

/////////////////////////////
/////  react-navigation /////
/////////////////////////////

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Savvy Shopper Login',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <LoginView />
        <Button
          onPress={() => navigate('NewUser')}
          title='Signup to Find an Expert!'
        />
      </View>
    );
  }
}

class SignupScreen extends React.Component {
  static navigationOptions = {
    // Nav options can be defined as a function of the navigation prop:
    title: ({ state }) => `Savvy Shopper Signup`,
  };
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Signup />
      </View>
    );
  }
}

///////////////////////////////
///// react-native-swiper /////
///////////////////////////////

class SwipeScreen extends React.Component {
  static navigationOptions = {
    title: 'Savvy Shopper',
  };
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Categories</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Chat</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>Preferences</Text>
        </View>
      </Swiper>
    );
  }
}

/////////////////////////////////
////////// app styling //////////
/////////////////////////////////

var styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  navigationContainer: {
    flex: 1
  }
})

///////////////////////////////
////////// app views //////////
///////////////////////////////

const app = StackNavigator({
  Home: { screen: LoginScreen },
  NewUser: { screen: SignupScreen },
  Swipe: { screen: SwipeScreen },
});

AppRegistry.registerComponent('app', () => app);