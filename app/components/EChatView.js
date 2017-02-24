import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';
import io from 'socket.io-client';

let room = null;
let socket = null;
let chatSession = {
  expertId: 1,
  userId: null
};

export default class EChatView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: []
    }
  }

  // automatically runs when component loads
  componentDidMount() {
    fetch('https://savvyshopper.herokuapp.com/api/userQueue/getUser', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((user) => {
      if (!user) {
        AlertIOS.alert(
          'Incorrect Username or Password.'
        )
      } else {
        socket = io('https://savvyshopper.herokuapp.com/');
        console.log('UserId Recieved:', user.id);
        chatSession.userId = user.id;
        console.log('*** JOINING ROOM ***', user.room);
        socket.emit('joinRoom', user.room, chatSession.expertId);
        room = user.room;
        socket.on('message', (message) => {
          console.log('Incoming Message:', message);
          this.setState({
            messages: this.state.messages.concat([message])
          });
        });
      }
    })
    .done();

  }

  sendMessage() {
    console.log('Sending Message.');
    socket.emit('message', this.state.message, room);
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