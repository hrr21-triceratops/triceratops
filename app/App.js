import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  View
} from 'react-native';

//load views from external files
import LoginView from './components/LoginView';
import ShopperView from './components/ShopperView';
import ChatView from './components/ChatView';
import TopExperts from './components/TopExperts';
import CategoryView from './components/shoppers/CategoryView';
import AvailableExperts from './components/AvailableExperts';
import HomeView from './components/HomeView';
import ProfileView from './components/ProfileView';
import RatingView from './components/shoppers/RatingView';
import Wishlist from './components/Wishlist';
import Tags from './components/Tags';
import Logo from './components/Logo.js';
import SearchViewExperts from './components/shoppers/SearchViewExperts';

//setup the app component to register with App registry, everything happens inside of this wrapper
class SavvyShopper extends Component {
  //selects a scene to render
  constructor(props){
    super(props);
    this.state = {screen: 'Login'};
  }

  renderScene(route, navigator) {
    // console.log('route', route);
    // console.log('navigator', navigator);
    switch (route.screen) {
      case "Login":
        return <LoginView navigator={navigator} {...route.passProps} />
      case "Home":
        return <HomeView navigator={navigator} {...route.passProps} />
      case "Rating":
        return <RatingView navigator={navigator} {...route.passProps} />
      case "Shopper":
        return <ShopperView navigator={navigator} {...route.passProps} />
      case "AvailableExperts":
        return <AvailableExperts navigator={navigator} {...route.passProps} />
      case "TopExpertsSearch":
        return <SearchViewExperts navigator={navigator} {...route.passProps} />
      case "TopExperts":
        return <TopExperts navigator={navigator} {...route.passProps} />
      case "ByCategory":
        return <CategoryView navigator={navigator} {...route.passProps} />
      case "Chat":
       return <ChatView navigator={navigator} {...route.passProps} />
      case "Profile":
        return <ProfileView navigator={navigator} {...route.passProps} />
      case "Wishlist":
        return <Wishlist navigator={navigator} {...route.passProps} />
      case "Tags":
        return <Tags navigator={navigator} {...route.passProps} />
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
          {  if (route.screen === "Login" || route.screen === "Home") {
                route.index = 0;
                var currentRoutes = navigator.getCurrentRoutes(0);
                return null;
            } else {
             return null;
         }},
        RightButton: (route, navigator, index, navState) => {
         },
        Title: (route, navigator, index, navState) => {
           if (route.screen !== 'Login') {
           return (
            <View
              style={styles.logo}>
              <Logo
                size={"logoSmall"}
                logoLocation={require('./assets/imgs/savvyShopperLogoOnly.png')}
              />
            </View>
            );
          }
        },
       }}
       style={{backgroundColor: 'white'}}
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
      backgroundColor: 'blue'
   },
   leftButton: {
      color: '#00008B',
      fontSize: 14,
   },
   logo: {
      top: null,
      color: '#00008B',
      justifyContent: 'center'
   },
   rightButton: {
      color: '#00008B',
      fontSize: 14
   },
});

console.disableYellowBox = true;
AppRegistry.registerComponent('SavvyShopper', () => SavvyShopper);
