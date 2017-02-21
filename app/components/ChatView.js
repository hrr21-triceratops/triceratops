import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';

export default class ChatView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: []
    };
  }

  // automatically runs when component loads
  componentDidMount() {
    this.isInitiator;
    this.room = '12345'; // userId to keep things simple?

    this.socket = io.connect();

    console.log('Message from client: Asking to join room ' + room);
    this.socket.emit('create or join', room);

    this.socket.on('created', function(room, clientId) {
      this.isInitiator = true;
    });

    this.socket.on('full', function(room) {
      console.log('Message from client: Room ' + room + ' is full :^(');
    });

    this.socket.on('ipaddr', function(ipaddr) {
      console.log('Message from client: Server IP address is ' + ipaddr);
    });

    this.socket.on('joined', function(room, clientId) {
      this.isInitiator = false;
    });

    this.socket.on('log', function(array) {
      console.log.apply(console, array);
    });

    socket.on('chat message', function(msg) {
      // a message was received
      console.log('New Message:', msg);
      // Add to state's messages array (bind 'this')
      this.setState({
        messages: this.state.messages.concat([msg])
      });
    });
  }

  sendMessage() {
    console.log('Sending Message.');
    this.socket.emit('chat message', this.state.message);
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
              <View key={msg}>
                <Text style={styles.text}>{msg}</Text>
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

// // automatically runs when component loads
//   componentDidMount() {
//     // opens new websocket connection
//     this.ws = new WebSocket('ws://localhost:2400/');

//     // runs when websocket connection opens
//     this.ws.onopen = () => {
//       console.log('WebSocket Open.');
//       this.ws.send('Testing 123'); // send a message
//     };

//     // runs when websocket server broadcasts new message
//     this.ws.onmessage = (e) => {
//       // a message was received
//       console.log('New Message:', e.data);
//       // Add to state's messages array (bind 'this')
//       this.setState({
//         messages: this.state.messages.concat([e.data])
//       });
//     };

//     // runs on websocket error
//     this.ws.onerror = (e) => {
//       // an error occurred
//       console.log('Error:', e.message);
//     };

//     // runs when websocket connection is closed
//     this.ws.onclose = (e) => {
//       // connection closed
//       console.log('WebSocket Closed.', e.code, e.reason);
//     };
//   }

//   sendMessage() {
//     console.log('Sending Message.');
//     this.ws.send(this.state.message);
//     this.setState({message: ''});
//   }