import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  AlertIOS,
} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';

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
          userToPass.user = user.username;
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
          <Text style={styles.title}>
            Sign In
          </Text>
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
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10, marginTop: 10}}
              backgroundColor='#48BBEC'
              onPress={(this.userLogin.bind(this))}
              raised
              title='Login'
            />
          </View>
          <View>
            <Button
              onPress={(this.userLogin.bind(this))}
              onPress={() => this.setState({hasAccount: false})}
              raised
              title='Join!'
              backgroundColor='#48BBEC'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10, marginTop: 10}}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            Become a Savvy Shopper!
          </Text>
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
              backgroundColor='#48BBEC'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10, marginTop: 10 }}
              title='Create Account'
            />
          </View>
          <View>
            <Button
              onPress={() => this.setState({hasAccount: true})}
              raised
              backgroundColor='#48BBEC'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10, marginTop: 10}}
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
    padding: 30,
    marginTop: 65,
    alignItems: "stretch",
    marginBottom: 5
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