import React, { Component, PropTypes  } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  NavigatorIOS,
  TouchableHighlight,
  TextInput,
  ActivityIndictorIOS
} from 'react-native';
import Tabs from 'react-native-tabs';

let connection = require('../Utils/connection');

export default class TabsNav extends Component {
  constructor(props){
    console.log('Home Props:', props);
    super(props);
    this.state = {
      page: 'Home',
      isActive: false,
      currentUser: null,
      index: 0
    };
  }

  navigateTo(destination, propsToPass, chatPartner) {
    if(destination === 'Chat') {
      fetch(connection + '/api/userQueue/loadUser/' + chatPartner.id, {
        method: 'GET'
      }).done();
    }
    if (!propsToPass) {
      console.log('destination', this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1]);

      if (destination !== this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1].screen) {
        this.props.navigator.push({
          screen: destination
        });
      }
    }
    if (!chatPartner) {
      console.log('destination', destination);
      console.log('destination2', destination, this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1].screen);
      console.log('props', propsToPass);
      if (destination !== this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1].screen) {
        this.props.navigator.push({
          screen: destination,
          passProps: {
            user: propsToPass
          }
        });
      }
    } else {
      console.log('destination', destination);
      console.log('destination2', destination, this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1].screen);

      console.log('props', propsToPass);

    if (destination !== this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1].screen) {

      this.props.navigator.push({
          screen: destination,
          passProps: {
            user: propsToPass,
            chatPartner: chatPartner
          }
        });
      }
    }
  }

  render() {
    return (
        <Tabs
         selected={this.state.page}
         style={{backgroundColor: '#333333'}}
         selectedStyle={{color:'white', 'fontWeight': 'bold'}}
         onSelect={el=>this.setState({ page: el.props.name })}>

          <Text
            name="Home"
            style={{color: '#e6e6e6'}}
            user={this.props.user}
            onPress={this.navigateTo.bind(this, "Home", this.props.user)}>
              Home
          </Text>

          <Text
            name="Wishlist"
            style={{color: '#e6e6e6'}}
            user={this.props.user}
            onPress={this.navigateTo.bind(this, "Wishlist", this.props.user)}>
              Wishlist
          </Text>

          <Text
            name="Top Experts"
            style={{color: '#e6e6e6'}}
            user={this.props.user}
            onPress={this.navigateTo.bind(this, "TopExpertsSearch", this.props.user)}>
              Top Experts
          </Text>

          <Text
            name="Profile"
            style={{color: '#e6e6e6'}}
            user={this.props.user}
            onPress={this.navigateTo.bind(this, "Profile", this.props.user)}>
              Profile
          </Text>
        </Tabs>
    );
  }
}

var styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
     searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 14,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
});