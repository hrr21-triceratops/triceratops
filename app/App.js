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
import ShopperView from './components/ShopperView';
import ChatView from './components/ChatView';

//setup the app component to register with App registry, everything happens inside of this wrapper
class app extends Component {
  //selects a scene to render
  renderScene(route, navigator) {
    if (route.name === 'Login') {
      return <LoginView navigator={navigator} />
    }
    if (route.name === 'Shopper') {
      return <ShopperView navigator={navigator} {...route.passProps} />
    }
    if (route.name === 'Chat') {
      return <ChatView navigator={navigator} {...route.passProps} />
    }
  }

  render() {
    return (
      //React native navigator component, sets a default route for when the app is launched
      // modified initial route for testing to be shopper page
      <Navigator
        style={{flex: 1}}
        initialRoute={{name: 'Login'}}
        renderScene={this.renderScene}
      />
    );
  }
}

AppRegistry.registerComponent('app', () => app);