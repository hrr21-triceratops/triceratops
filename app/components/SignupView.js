import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  AlertIOS,
} from 'react-native';

var STORAGE_KEY = 'id_token';

export default class SignupView extends Component {

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

  _navigate(scene) {
    this.props.navigator.push({
      name: scene
    })
  }

  _userSignup() {
    var username = this.state.username;
    var password = this.state.password;
    if (!this.state.username || !this.state.password) {
      AlertIOS.alert(
        'Missing Username or Password.'
      )
    } else {
      fetch("http://localhost:2300/api/users", {
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
        if (!responseData) {
          AlertIOS.alert(
            'User already exists!'
          )
        } else {
          this._onValueChange(STORAGE_KEY, responseData.id_token)
          this._navigate('Shopper')
        }
      })
      .done();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Be a Savvy Shopper!
        </Text>
        <View>
          <TextInput
            placeholder="username"
            onChangeText={(text) => this.setState({username: text})}
            style={styles.formInput}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
            style={styles.formInput}
          />
          <TouchableHighlight
            onPress={(this._userSignup.bind(this))}
            style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableHighlight>
        </View>
        <View>
          <Text
            onPress={() => this._navigate('Login')}
            style={styles.text}>Login to Account</Text>
        </View>
      </View>
    );
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