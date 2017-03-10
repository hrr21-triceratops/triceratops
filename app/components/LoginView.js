import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  AlertIOS,
  Image
} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import Logo from './Logo.js';


let connection = require('../Utils/connection');
let profilePic = 'https://raw.githubusercontent.com/hrr21-triceratops/triceratops/master/app/assets/imgs/user-profile.png';

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasAccount: true,
      username: '',
      password: ''
    };
  }

  navigate(scene, user) {
    this.props.navigator.resetTo({
      screen: scene,
      passProps: {
        user: user
      }
    });
  }

  userLogin() {
    var username = this.state.username.toLowerCase(); // Not case sensitive
    var password = this.state.password;
    if (!this.state.username || !this.state.password) {
      AlertIOS.alert('Missing username or password.');
    } else {
      fetch(connection + '/api/users/login', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then((response) => response.json())
      .then((user) => {
        if (!user) {
          AlertIOS.alert('Incorrect username or password.');
        } else {
          let userToPass = {};
          userToPass.id = user.id;
          userToPass.username = user.username;
          userToPass.averageRating = user.averageRating;
          userToPass.shopperExpert = user.shopperExpert;
          userToPass.active = user.active;
          userToPass.closedChatSessions = user.closedChatSessions;
          userToPass.userPreferences = user.userPreferences;
          userToPass.profileImage = user.profileImage || profilePic;
          this.navigate('Home', userToPass);
        }
      })
      .done();
    }
  }

  userSignup() {
    var username = this.state.username.toLowerCase(); // Not case sensitive
    var password = this.state.password;
    if (!this.state.username || !this.state.password) {
      AlertIOS.alert('Missing username or password.');
    } else {
      fetch(connection + '/api/users', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then((response) => response.json())
      .then((user) => {
        if (!user) {
          AlertIOS.alert('Username already exists.');
        } else {
          let userToPass = {};
          userToPass.id = user.id;
          userToPass.username = user.username;
          userToPass.averageRating = user.averageRating;
          userToPass.shopperExpert = user.shopperExpert;
          userToPass.active = user.active;
          userToPass.closedChatSessions = user.closedChatSessions;
          userToPass.userPreferences = user.userPreferences;
          userToPass.profileImage = user.profileImage || profilePic;
          this.navigate('Home', userToPass);
        }
      })
      .done();
    }
  }

  render() {
    if (this.state.hasAccount) {
      return (
        <View style={styles.container}>
          <View style={{height: 160}}>
            <Logo size={"logoMediumLarge"}/>
          </View>
          <View>
            <FormInput
              placeholder="username"
              onChangeText={(text) => this.setState({username: text})}
              style={styles.formInput}
            />
            <FormInput
              placeholder="password"
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password: text})}
              style={styles.formInput}
            />
            <Button
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10, marginTop: 20, width: 310, alignSelf: 'center'}}
              backgroundColor='#00008B'
              onPress={(this.userLogin.bind(this))}
              raised
              titleStyle={{fontWeight: 'bold'}}
              title='Login'
            />
          </View>
          <View>
            <Button
              onPress={(this.userLogin.bind(this))}
              onPress={() => this.setState({hasAccount: false})}
              raised
              backgroundColor='#00008B'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10, marginTop: 10, width: 310, alignSelf: 'center'}}
              titleStyle={{fontWeight: 'bold'}}
              title='Join!'
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={{height: 160}}>
            <Logo size={"logoMediumLarge"}/>
          </View>
          <View>
            <FormInput
              placeholder="username"
              onChangeText={(text) => this.setState({username: text})}
              style={styles.formInput}
            />
            <FormInput
              placeholder="password"
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password: text})}
              style={styles.formInput}
            />

            <Button
              onPress={(this.userSignup.bind(this))}
              style={styles.button}
              raised
              backgroundColor='#00008B'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10, marginTop: 20, width: 310, alignSelf: 'center' }}
              titleStyle={{fontWeight: 'bold'}}
              title='Create Account'
            />
          </View>
          <View>
            <Button
              onPress={() => this.setState({hasAccount: true})}
              raised
              backgroundColor='#00008B'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10, marginTop: 10, width: 310, alignSelf: 'center'}}
              titleStyle={{fontWeight: 'bold'}}
              title='Login!'
           />
          </View>
        </View>
      );
    }
  }
}

var styles = StyleSheet.create({
  container: {

  },
  title: {
    fontSize: 18,
    alignSelf: 'center'
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
    alignSelf: 'stretch',
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