import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import io from 'socket.io-client';

let room = null;
let socket = null;
let chatSession = {
  userId: 3,
  expertId: null
};

export default class ChatView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: []
    }
  }

  // automatically runs when component loads
  componentDidMount() {
    socket = io('https://savvyshopper.herokuapp.com/');

    socket.on('id', (socketId) => {
      socket.emit('createRoom', socketId, chatSession.userId);
      room = socketId;
      console.log('*** NEW ROOM ***', socketId);
    });

    socket.on('expert', (expertId) => {
      chatSession.expertId = expertId;
      console.log('ExpertId Recieved:', expertId);
    });

    socket.on('message', (message) => {
      console.log('Incoming Message:', message);
      this.setState({
        messages: this.state.messages.concat([message])
      });
    });

  }

  disconnect() {
    // post all messages in this.state.messages to DB

    // Send array of messages in this format:
    // {
    //   "chatSessionID": "abcdefgh",
    //   "senderID": 1,
    //   "receiverID": 3,
    //   "message": "Get dem beatz",
    //   "date": "2017-02-23T23:31:05.177Z"
    // }

    // REMOVE FIRST TWO ITEMS IN ARRAY (Connection Verification)
    this.state.messages.shift();
    this.state.messages.shift();

    fetch('https://savvyshopper.herokuapp.com/api/chat/messages', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: this.state.messages
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
    })
    .done();


    // reroute to ShopperView
  }

  sendMessage() {
    console.log('Sending Message.');
    let message = {
      chatSessionID: room,
      senderID: chatSession.userId,
      receiverID: chatSession.expertId,
      message: this.state.message,
      date: new Date()
    };
    socket.emit('message', message, room);
    this.setState({message: ''});
    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chat Session</Text>
        <View>
          {this.state.messages.map(function(msg) {
            return (
              <View key={msg.message}>
                <Text style={styles.text}>{msg.message}</Text>
              </View>
            )
          })}
        </View>
        <View>
          <TextInput
            placeholder="type message here"
            onChangeText={(text) => this.setState({message: text})}
            style={styles.formInput}
          />
          <TouchableHighlight
            onPress={(this.sendMessage.bind(this))}
            style={styles.button}>
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={(this.disconnect.bind(this))}
            style={styles.button}>
            <Text style={styles.buttonText}>Question Answered</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
    container: {
    padding: 30,
    marginTop: 65,
    alignItems: "stretch"
  },
  title: {
    fontSize: 18,
    marginBottom: 10
  },
  text: {
    alignSelf: 'center'
  },
  formInput: {
    height: 36,
    padding: 10,
    marginRight: 5,
    marginBottom: 5,
    marginTop: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#555555",
    borderRadius: 8,
    color: "#555555"
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});