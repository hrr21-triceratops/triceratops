import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class ChatView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>Chat History</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});