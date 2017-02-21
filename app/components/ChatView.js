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

  // automatically runs when component loads
  componentDidMount() {
    // opens new websocket connection
    this.ws = new WebSocket('ws://localhost:2400/');

    // runs when websocket connection opens
    this.ws.onopen = () => {
      console.log('WebSocket Open.');
      this.ws.send('Testing 123'); // send a message
    };

    // runs when websocket server broadcasts new message
    this.ws.onmessage = (e) => {
      // a message was received
      console.log('New Message:', e.data);
      // Add to state's messages array (bind 'this')
      this.setState({
        messages: this.state.messages.concat([e.data])
      });
    };

    // runs on websocket error
    this.ws.onerror = (e) => {
      // an error occurred
      console.log('Error:', e.message);
    };

    // runs when websocket connection is closed
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