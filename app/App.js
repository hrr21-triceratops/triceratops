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

var Login = require('./components/login.js');
var Signup = require('./components/signup.js');

/////////////////////////////
/////  react-navigation /////
/////////////////////////////

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Savvy Shopper',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Login />
      </View>
    );
  }
}

class ChatScreen extends React.Component {
  static navigationOptions = {
    // Nav options can be defined as a function of the navigation prop:
    title: ({ state }) => `Chat with ${state.params.user}`,
  };
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Your expert is {params.user}</Text>
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
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
})

///////////////////////////////
////////// app views //////////
///////////////////////////////

const app = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
  Swipe: { screen: SwipeScreen },
});

AppRegistry.registerComponent('app', () => app);