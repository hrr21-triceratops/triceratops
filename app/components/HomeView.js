import React, { Component, PropTypes  } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  NavigatorIOS,
  TouchableHighlight,
  TextInput,
  ActivityIndictorIOS
} from 'react-native';
import SearchView from './shoppers/SearchView';
// import TopExperts from './TopExperts';
import AvailableExperts from './AvailableExperts';
import Tabs from 'react-native-tabs';
import {
  SearchBar,
  Button
} from 'react-native-elements';

let connection = require('../Utils/connection');

const usersToHelp = null;
const usersToCheck = null;

export default class HomeView extends Component {
  constructor(props){
    console.log('Home Props:', props);
    super(props);
    this.state = {
      page: 'Home',
      isActive: false,
      currentUser: null,
      index: 0
    };
  }

  activeSwitcher() {
    this.setState({isActive: !this.state.isActive});
    this.renderExpert();
  }

  getActive() {
    return this.state.isActive;
  }

  navigateTo(destination, propsToPass, chatPartner) {
    if(destination === 'Chat') {
      fetch(connection + '/api/userQueue/loadUser/' + chatPartner.id, {
        method: 'GET'
      }).done();
    }
    if (!propsToPass) {
      console.log('destination', this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1]);

      if (destination !== this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1].screen) {
        this.props.navigator.push({
          screen: destination
        });
      }
    }
    if (!chatPartner) {
      console.log('destination', destination);
      console.log('destination2', destination, this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1].screen);
      console.log('props', propsToPass);
      if (destination !== this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1].screen) {
        this.props.navigator.push({
          screen: destination,
          passProps: {
            user: propsToPass
          }
        });
      }
    } else {
      console.log('destination', destination);
      console.log('destination2', destination, this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1].screen);

      console.log('props', propsToPass);

    if (destination !== this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1].screen) {

      this.props.navigator.push({
          screen: destination,
          passProps: {
            user: propsToPass,
            chatPartner: chatPartner
          }
        });
      }
    }
  }

  showNext() {
    if(usersToCheck.length - 1 > this.state.index) {
      this.setState({currentUser: usersToHelp[usersToCheck[this.state.index+1]], index: this.state.index+1});
    } else {
      this.setState({currentUser: usersToHelp[usersToCheck[0]], index: 0});
    }
  }

  renderExpert() {
    fetch(connection + '/api/userQueue/loadUser', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response.json();
      console.log("RESPONSE", response);
    }).then((users) => {
      if(!users){
        console.log("TROUBLE");
      }
      console.log("USERS IN QUEUE", users);
      usersToHelp = users;
      usersToCheck = Object.keys(usersToHelp);
      this.setState({currentUser: usersToHelp[usersToCheck[0]]});
    }).done()
  }

  render() {
    let button = null;
    if (this.getActive()) {
      button = <TouchableHighlight
            onPress={() => this.activeSwitcher()}
            style={styles.button}>
            <Text style={styles.buttonText}>Go Offline</Text>
          </TouchableHighlight>
    } else {
      button = <TouchableHighlight
            onPress={() => this.activeSwitcher()}
            style={styles.button}>
            <Text style={styles.buttonText}>Go Online</Text>
          </TouchableHighlight>
    }
    return (
       <View style={styles.mainContainer}>
        <Tabs selected={this.state.page}
         style={{backgroundColor:'#4F4F4F'}}
         selectedStyle={{color:'#53A9C9'}}
         onSelect={el=>this.setState({ page: el.props.name })}>

          <Text
            name="Home" style={styles.buttonText}
            user={this.props.user}
            onPress={this.navigateTo.bind(this, "Home", this.props.user)}>
              Home
          </Text>

          <Text
            name="Wishlist" style={styles.buttonText}
            user={this.props.user}
            onPress={this.navigateTo.bind(this, "Wishlist", this.props.user)}>
              Wishlist
          </Text>

          <Text
            name="Profile" style={styles.buttonText}
            user={this.props.user}
            onPress={this.navigateTo.bind(this, "Profile", this.props.user)}>
              Profile
          </Text>

        </Tabs>
        {!this.props.user.shopperExpert &&
         <SearchView style={styles.searchInput} navigator={this.props.navigator} user={this.props.user}/>}
          {this.getActive() &&
          <View>
            {this.state.currentUser && <View style={styles.user}><Text style={styles.userInLine}>{this.state.currentUser.username.toUpperCase()}</Text>
              <Text>{this.state.currentUser.category}</Text></View>
            }
            <View style={styles.rowLayout}>
              <Button buttonStyle={styles.buttonHelp}
              onPress={() => this.navigateTo('Chat', this.props.user, this.state.currentUser)} iconRight icon={{name:'thumb-up'}} title='HELP USER' textStyle={styles.buttonText}>
              </Button>

              <Button buttonStyle={styles.buttonSkip}
              onPress={() => this.showNext()} icon={{name:'fast-forward'}} textStyle={styles.buttonText}>
              </Button>
            </View>
          </View>
        }
        {this.props.user.shopperExpert && button}
      </View>
    );
  }
}

var styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
     searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 14,
        color: '#FFFFFF',
        alignSelf: 'center'
    },
    rowLayout: {
      flexDirection: 'row',
    },
    userInLine: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 12,
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: '#00008B',
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonHelp: {
        height: 45,
        width: 160,
        backgroundColor: '#00008B',
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    buttonSkip: {
        flex: 1,
        height: 45,
        width: 56,
        backgroundColor: '#53A9C9',
        marginBottom: 10,
        justifyContent: 'center',
        marginTop: 10,
    },
    user: {
      backgroundColor: '#F2F2F2',
      height: 180,
      paddingLeft: 20,
      paddingTop: 20,
      fontWeight: 'bold',
    }
});