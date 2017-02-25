import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class AccountView extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
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
            onPress={() => AlertIOS.alert('Setting up expert account...')}
            style={styles.button}>
            <Text style={styles.buttonText}>Become an Expert</Text>
          </TouchableHighlight>
        }
        {this.props.user.shopperExpert &&
          button
        }
        <TouchableHighlight
          onPress={() => AlertIOS.alert('Logging Out...')}
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