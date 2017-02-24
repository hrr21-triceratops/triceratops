import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
} from 'react-native';

//load views from external files
import LoginView from './components/LoginView';
import SignupView from './components/SignupView';
import ShopperView from './components/ShopperView';
import ExpertView from './components/ExpertView';
import ChatView from './components/ChatView';
import EChatView from './components/EChatView';

//setup the app component to register with App registry, everything happens inside of this wrapper
class app extends Component {
  //selects a scene to render
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
    if (route.name === 'Chat') {
      return <ChatView navigator={navigator} />
    }
    if (route.name === 'EChat') {
      return <EChatView navigator={navigator} />
    }
  }

  render() {
    return (
      //React native navigator component, sets a default route for when the app is launched
      // modified initial route for testing to be shopper page
      <Navigator
        style={{flex: 1}}
        initialRoute={{name: 'Expert'}}
        renderScene={this.renderScene}
      />
    );
  }
}

AppRegistry.registerComponent('app', () => app);