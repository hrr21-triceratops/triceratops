import React, { Component } from 'react';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';
import io from 'socket.io-client';
import RatingView from './shoppers/RatingView';
import { Button } from 'react-native-elements';
import {GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';

let connection = require('../Utils/connection');

// GIFTED CHAT MESSAGE OBJECT FORMAT
// {
//   _id: 1,
//   text: 'My message',
//   createdAt: new Date(),
//   user: {
//     _id: 2,
//     name: 'React Native',
//     avatar: 'https://facebook.github.io/react/img/logo_og.png',
//   },
//   chatSessionID: 'asjdfjsgeragj',
// }

// FOR DEMO PURPOSES
// let texts = [
//       'Cool, I\'ve got the perfect pair!',
//       'The Bose QuietComfort 35 will change your life.',
//       'Your welcome, have a great afternoon!'];

export default class ChatView extends Component {
  constructor(props) {
    console.log('ChatView Props:', props);
    super(props);
    this.state = {
      messages: [],
      modalVisible: false,
      userId: 3,
      expertId: 4,
      typingText: null,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);

    // MERGED FROM OLD CHAT CODE
    this.chatSession = {
      _id: null,
      socket: null,
      room: null,
      chatPartner: null,
      category: null,
      username: null
    };
  }

  setModalVisible() {
    this.setState({modalVisible: true});
  }

  closeModal() {
    this.setState({modalVisible: false});
  }

  componentWillMount() {
    let self = this;
    this._isMounted = true;


    // MERGED FROM OLD CHAT CODE
    this.chatSession.socket = io(connection, {jsonp: false});

    // IF USER IS NOT AN EXPERT
    if(!this.props.user.shopperExpert){
      self.setState((previousState) => {
        return {
          typingText: 'Finding your expert...'
        };
      });

      self.chatSession.category = this.props.category;
      self.chatSession.username = this.props.user.username;
      self.chatSession.socket.on('id', (socketId) => {
        self.chatSession.socket.emit('createRoom', socketId, self.props.user.id, this.props.category, this.props.user.username);
        self.chatSession._id = socketId; // Redundant - room is same as _id
        self.chatSession.room = socketId;
        console.log('*** NEW ROOM ***', socketId);
        console.log('chatSession:', self.chatSession);

        // SEND SESSION ID TO USER'S CLOSED CHAT SESSIONS ARRAY
        self.props.user.closedChatSessions.push(self.chatSession._id);
        console.log('New Chat Sessions:', self.props.user.closedChatSessions);

        // PUT REQUEST TO DATABASE WITH NEW closedChatSessions ARRAY
        fetch(connection+'/api/users/' + self.props.user.id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            attributes: {
              closedChatSessions: self.props.user.closedChatSessions
            }
          })
        })
        .then((response) => {
          console.log(response);
        })
        .done();
      });

      self.chatSession.socket.on('expert', (expertId, expertUsername) => {
        self.chatSession.chatPartner = expertId;
        console.log('ExpertId Recieved:', expertId, expertUsername);
        self.setState((previousState) => {
          return {
            typingText: 'Connected with Expert ' + expertUsername
          };
        });
      });

      self.chatSession.socket.on('message', (message) => {
        console.log('Incoming Message:', message);
        // CALL onRECIEVE METHOD
        self.onReceive(message); // message = MESSAGE OBJECT
      });
    }

    // IF USER IS AN EXPERT
    if(this.props.user.shopperExpert){
      console.log('UserId Recieved:', this.props.chatPartner.id);
      self.chatSession.chatPartner = this.props.chatPartner.id;
      self.chatSession.username = this.props.user.username;
      self.chatSession.category = this.props.category;
      console.log('*** JOINING ROOM ***', this.props.chatPartner.room);
      self.chatSession.socket.emit('joinRoom', this.props.chatPartner.room, self.props.user.id, this.props.user.username);
      self.chatSession._id = this.props.chatPartner.room;
      self.chatSession.room = this.props.chatPartner.room;
      console.log('chatSession:', self.chatSession);

      self.chatSession.socket.on('message', (message) => {
        console.log('Incoming Message:', message);
        // CALL onRECIEVE METHOD
        self.onReceive(message); // message = MESSAGE OBJECT
      });
    }
  }

  onSend(messages = []) {
    let self = this;
    let message = messages[0];

    // Add chatSessionID to message
    message.chatSessionID = this.chatSession._id;
    console.log('onSend:', message);

    // EMIT MESSAGE TO CHAT PARTNER
    this.chatSession.socket.emit('message', message, self.chatSession.room);

    // POST MESSAGE TO DB
    fetch(heroku + 'api/chat/messages', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message})
    })
    .then((response) => {
      console.log(response);
    })
    .done();

    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, [message]),
      };
    });

    // FOR DEMO PURPOSES
    // this.answerDemo(messages);
    console.log('All Messages:', this.state.messages);
  }

  navigate() {
    this.props.navigator.push({
      screen: 'Home'
    });
    this.setModalVisible();
  }

  onReceive(message) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, message)
      };
    });
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}

          user={{
            _id: this.props.user.id, // sent messages should have same user._id
            name: this.props.user.username, // add optional avatar
          }}

          renderBubble={this.renderBubble}
          renderFooter={this.renderFooter}
        />
        {!this.props.user.shopperExpert &&
        <Button
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10, marginTop: 10 }}
          style={styles.button}
          onPress={this.navigate.bind(this)}
          raised title='Rate Expert' />
        }

        <View><RatingView user={this.props} userId={this.state.userId} expertId={this.state.expertId} modalVisible={this.state.modalVisible} closeModal={this.closeModal.bind(this)} /></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
  button: {
      height: 45,
      flexDirection: 'row',
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      marginTop: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
  }
});