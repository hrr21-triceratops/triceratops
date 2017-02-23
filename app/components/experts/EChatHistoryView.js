import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class EChatHistoryView extends Component {

  constructor(props) {
    super(props);
  }

  checkUserQueue() {
    // check if user in queue
  }

  navigate(scene) {
    this.props.navigator.push({
      name: scene
    });
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>Chat History</Text>
        <TouchableHighlight
            onPress={() => this.navigate('EChat')}>
            <Text>HALP</Text>
          </TouchableHighlight>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});