import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';
import Swiper from 'react-native-swiper';

var categories = ['HOME', 'FOOD', 'TECH', 'WOMEN\'S FASHION', 'MEN\'S FASHION', 'ENTERTAINMENT'];

export default class CategoryView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
      {categories.map(function(category) {
        return (
          <TouchableHighlight
            onPress={() => AlertIOS.alert('Finding Expert!')}
            style={styles.button}
            key={category}>
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableHighlight>
        )
      })}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  buttonText: {
    fontSize: 22,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    width: 310,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    marginTop: 2,
    marginBottom: 2,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});