import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class EAccountView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>PREFERENCES</Text>
        <Text style={styles.text}>Home</Text>
        <Text style={styles.text}>Food</Text>
        <Text style={styles.text}>Tech</Text>
        <Text style={styles.text}>Women\'s Fashion</Text>
        <Text style={styles.text}>Men\'s Fashion</Text>
        <Text style={styles.text}>Entertainment</Text>
        <TouchableHighlight
          onPress={() => AlertIOS.alert('Setting up expert account...')}
          style={styles.button}>
          <Text style={styles.buttonText}>Become an Expert</Text>
        </TouchableHighlight>
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