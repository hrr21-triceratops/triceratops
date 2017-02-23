import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import io from 'socket.io-client';

export default class ChatView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: []
    }
    this.user = {
      id: 3,
      username: "triceratops3@gmail.com"
    }
  }

  // automatically runs when component loads
  componentDidMount() {
    this.socket = io('http://localhost:2300');
    // console.log('*** USER ***', this.user);

    this.socket.on('id', (socketId) => {
      // room = socketId;
      var context = this;
      context.socket.emit('createRoom', socketId, context.user.id);
      console.log('*** NEW ROOM ***', socketId);
    });

///////////////////////////////////////////////

    // this.socket.on('created', function(room, clientId) {
    //   //
    // });

    // this.socket.on('message', (message) => {
    //   console.log('Incoming Message:', message);
    //   this.setState({
    //     messages: this.state.messages.concat([message])
    //   });
    // });

    // this.socket.on('full', function(room) {
    //   console.log('Room is full.');
    // });

    // this.socket.on('ipaddr', function(ipaddr) {
    //   console.log('Server IP address is', ipaddr);
    // });

    // this.socket.on('joined', function(room, clientId) {
    //   //
    // });
  }

  sendMessage() {
    console.log('Sending Message.');
    this.socket.emit('message', this.state.message);
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