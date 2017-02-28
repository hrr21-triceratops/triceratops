import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';
import Swiper from 'react-native-swiper';


const heroku = 'https://savvyshopper.herokuapp.com';
const local = 'http://localhost:2300';

export default class AccountView extends Component {

  constructor(props) {
    console.log("ACCOUNT PROPS", props);
    super(props);
  }

  makeExpert() {
    fetch(local+'/api/users/' + this.props.user.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        attributes: {
          shopperExpert: true
        }
      })
    })
    .then((response) => {
      if (response.status === 201) {
        this.navigate('Shopper', this.props.user.id, this.props.user.username, this.props.user.averageRating, true, this.props.user.active, this.props.user.closedChatSessions, this.props.user.userPreferences);
      } else {
        AlertIOS.alert(
          'Account could not be updated.'
        )
      }
    })
    .done();
  }

  navigate(scene, id, username, averageRating, shopperExpert, active, closedChatSessions, userPreferences) {
    if (id) {
      this.props.navigator.push({
        screen: scene,
        passProps: {
          id: id,
          username: username,
          averageRating: averageRating,
          shopperExpert: shopperExpert,
          active: active,
          closedChatSessions: closedChatSessions,
          userPreferences: userPreferences
        }
      });
    } else {
      this.props.navigator.push({
        screen: scene
      });
    }
  }

  render() {
    let button = null;
    if(this.props.getActive()){
      button = <TouchableHighlight
            onPress={() => this.props.activeSwitcher()}
            style={styles.button}>
            <Text style={styles.buttonText}>Go Offline</Text>
          </TouchableHighlight>
    } else {
      button = <TouchableHighlight
            onPress={() => this.props.activeSwitcher()}
            style={styles.button}>
            <Text style={styles.buttonText}>Go Online</Text>
          </TouchableHighlight>
    }
    return (
      <View>
        <Text style={styles.title}>PREFERENCES</Text>
        <Text style={styles.text}>Home</Text>
        <Text style={styles.text}>Food</Text>
        <Text style={styles.text}>Tech</Text>
        <Text style={styles.text}>Women\'s Fashion</Text>
        <Text style={styles.text}>Men\'s Fashion</Text>
        <Text style={styles.text}>Entertainment</Text>
        {!this.props.user.shopperExpert &&
          <TouchableHighlight
            onPress={() => this.makeExpert()}
            style={styles.button}>
            <Text style={styles.buttonText}>Become an Expert</Text>
          </TouchableHighlight>
        }
        {this.props.user.shopperExpert &&
          button
        }
        <TouchableHighlight
          onPress={() => this.navigate('Login')}
          style={styles.button}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
var styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 15,
    alignSelf: 'center',
    color: 'white'
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    width: 310,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});