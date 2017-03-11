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
import ChatView from './components/ChatView';
import TopExperts from './components/TopExperts';
import HomeView from './components/HomeView';
import ProfileView from './components/ProfileView';
import RatingView from './components/shoppers/RatingView';
import Wishlist from './components/Wishlist';
import Tags from './components/Tags';
import Logo from './components/Logo.js';
import SearchViewExperts from './components/shoppers/SearchViewExperts';

class SavvyShopper extends Component {
  constructor(props){
    super(props);
    this.state = {screen: 'Login'};
  }

  renderScene(route, navigator) {
    switch (route.screen) {
      case 'Login':
        return <LoginView navigator={navigator} {...route.passProps} />
      case 'Home':
        return <HomeView navigator={navigator} {...route.passProps} />
      case 'Rating':
        return <RatingView navigator={navigator} {...route.passProps} />
      case 'Shopper':
        return <ShopperView navigator={navigator} {...route.passProps} />
      case 'TopExpertsSearch':
        return <SearchViewExperts navigator={navigator} {...route.passProps} />
      case 'Chat':
       return <ChatView navigator={navigator} {...route.passProps} />
      case 'Profile':
        return <ProfileView navigator={navigator} {...route.passProps} />
      case 'Wishlist':
        return <Wishlist navigator={navigator} {...route.passProps} />
      case 'Tags':
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
            LeftButton: (route, navigator, index, navState) => {
              if (route.screen === 'Login' || route.screen === 'Home') {
                return null;
              } else if (route.screen === 'Tags' || route.screen === 'Chat' ) {
              return (
                <TouchableHighlight onPress={() => navigator.pop()}>
                  <Text style={styles.leftButton}>Back</Text>
                </TouchableHighlight>
              );
              }
            },
            RightButton: (route, navigator, index, navState) => {
            },
            Title: (route, navigator, index, navState) => {
              if (route.screen === 'Login') {

              } else {
                return (
                  <View
                    style={styles.logo}>
                    <Logo
                      size={'logoMedium'}
                      logoLocation={require('./assets/imgs/savvyShopperLogoOnly.png')}
                    />
                  </View>
                  );
              }
            },
          }
        }
       style={{backgroundColor: 'white'}}/>
      }/>
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
      textAlign: 'center',
      marginTop: 15,
      marginLeft: 5
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
