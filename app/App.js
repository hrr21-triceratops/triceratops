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
import TopExperts from './components/TopExperts';
import AvailableExperts from './components/AvailableExperts';
import HomeView from './components/HomeView';

//setup the app component to register with App registry, everything happens inside of this wrapper
class SavvyShopper extends Component {
  //selects a scene to render
  constructor(props){
    super(props);
    this.state = {"screen": "Login"};
  }

  renderScene(route, navigator) {
    switch (route.screen) {
      case "Login":
        return <LoginView navigator={navigator} />
      case "Home":
        return <HomeView navigator={navigator} />
      case "Shopper":
        return <ShopperView navigator={navigator} {...route.passProps} />
      case "AvailableExperts":
        return <AvailableExperts navigator={navigator} {...route.passProps} />
      case "TopExperts":
        return <TopExperts navigator={navigator} {...route.passProps} />
      case "Chat":
       return <ChatView navigator={navigator} {...route.passProps} />
      }
  }

  render() {
    var self = this;
    return (
       <Navigator
        initialRoute={{screen: 'Login'}}
        renderScene={(route, nav) => {return this.renderScene(route, nav)}}
        navigationBar={
        <Navigator.NavigationBar
       routeMapper={{
         LeftButton: (route, navigator, index, navState) =>
          {  if (route.index === 0) {
              return null;
            } else {
             return (
              <TouchableHighlight onPress={() => navigator.pop()}>
               <Text style={styles.leftButton}>Back</Text>
              </TouchableHighlight>
            );
         }},
         RightButton: (route, navigator, index, navState) =>
           { return (<Text style={styles.rightButton}>Profile</Text>); },
         Title: (route, navigator, index, navState) =>
           { return (<Text style={styles.title}>Savvy Shopper</Text>); },
       }}
       style={{backgroundColor: 'gray'}}
      />
      }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  navigationBar: {
      backgroundColor: 'blue',
   },
   leftButton: {
      color: 'white',
      margin: 10,
      fontSize: 14,
   },
   title: {
      paddingVertical: 10,
      color: '#ffffff',
      justifyContent: 'center',
      fontSize: 20
   },
   rightButton: {
      color: '#ffffff',
      margin: 10,
      fontSize: 14
   },
});


AppRegistry.registerComponent('SavvyShopper', () => SavvyShopper);
