import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class ChatView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: ['First!']
    };
  }

  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:2400/');

    this.ws.onopen = () => {
      // connection opened
      console.log('WebSocket Open.');
      this.ws.send('Testing 123'); // send a message
    };

    this.ws.onmessage = (e) => {
      // a message was received
      console.log('New Message:', e.data);
      // Add to state's messages array (bind 'this')
      this.setState({
        messages: this.state.messages.concat([e.data])
      });
    };

    this.ws.onerror = (e) => {
      // an error occurred
      console.log('Error:', e.message);
    };

    this.ws.onclose = (e) => {
      // connection closed
      console.log('WebSocket Closed.', e.code, e.reason);
    };
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>Chat Session</Text>
        <Text style={styles.text}>{this.state.messages}</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  }
});