import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  AlertIOS,
} from 'react-native';

// var AppView = require('./AppView');
var STORAGE_KEY = 'id_token';

class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _userLogin() {
    var username = this.state.username;
    var password = this.state.password;

    AlertIOS.alert(
      username, password
    )

    if (!this.state.username || !this.state.password) {
      AlertIOS.alert(
        'Missing Username or Password.'
      )
    } else {
      fetch("http://localhost:2300/api/users/login", {
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
      .then((responseData) => {
        console.log(responseData);
        if (!responseData) {
          AlertIOS.alert(
            'Incorrect Username or Password.'
          )
        } else {
          AlertIOS.alert(
            'Login Successful!'
          ),
          this._onValueChange(STORAGE_KEY, responseData.id_token)
          // REROUTE FROM onSubmitPressedBelow
        }
      })
      .done();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Sign In
        </Text>
        <View>
          <TextInput
            placeholder="Username"
            onChange={(event) => this.setState({username: event.nativeEvent.text})}
            style={styles.formInput}
            value={this.state.username} />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChange={(event) => this.setState({password: event.nativeEvent.text})}
            style={styles.formInput}
            value={this.state.password} />
          <TouchableHighlight
            onPress={(this._userLogin.bind(this))}
            style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  onSubmitPressed() {
    this.props.navigator.push({
      title: 'Savvy Shopper',
      component: AppView,
      passProps: {
        username: this.state.username,
        password: this.state.password
      },
    });
  }
};

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
  formInput: {
    height: 36,
    padding: 10,
    marginRight: 5,
    marginBottom: 5,
    marginTop: 5,
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#555555",
    borderRadius: 8,
    color: "#555555"
  },
  button: {
    height: 36,
    flex: 1,
    backgroundColor: "#555555",
    borderColor: "#555555",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    alignSelf: "center"
  },
});

module.exports = LoginView;