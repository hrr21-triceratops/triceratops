import React, { Component, PropTypes  } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  ActivityIndicator
} from 'react-native';
import AvailableExperts from '../AvailableExperts';
var api = require('../../Utils/api');
import {
  Button,
  FormLabel, FormInput, SearchBar
} from 'react-native-elements';

export default class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      isLoading: false,
      error: false,
      categories: ['HOME', 'FOOD', 'TECH', 'WOMEN\'S FASHION', 'MEN\'S FASHION', 'ENTERTAINMENT'],
      query: ''
    };
  }

  handleChange(event) {
    this.setState({
      searchTerm: event.nativeEvent.text
    });
  }

  goToAvailableExperts(experts) {
    this.props.navigator.push({
      screen: 'Chat',
      passProps: {
        user: this.props.user,
        category: this.state.searchTerm
      }
    });
  }

  handleSubmit(event) {
    this.setState({
      isLoading: true
    });
    this.goToAvailableExperts();

    this.setState({
      isLoading: false,
      error: false,
      searchTerm: ''
    });
  }

  render() {
    var displayErr = (
      this.state.error ? <Text>{this.state.error} </Text> : <View></View>
    );
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Find Expert For</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          placeholder={'SEARCH'}
          placeholderTextColor={'white'}
          onChange={this.handleChange.bind(this)}
         />
          <Button
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10, marginTop: 10, backgroundColor: '#00008B' }}
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          raised title='Chat Now!' />
          <ActivityIndicator
          animating={this.state.isLoading}
          color='#111'
          size='large'>
          </ActivityIndicator>
          {displayErr}
      </View>
    );
  }
}

var styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {
        marginBottom: 20,
        fontSize: 40,
        textAlign: 'center',
        color: 'black'
    },
    searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#48BBEC',
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
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