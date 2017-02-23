import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';
import ECategoryView from './experts/ECategoryView';
import EChatHistoryView from './experts/EChatHistoryView';
import EAccountView from './experts/EAccountView';

export default class ExpertView extends Component {

  constructor(props) {
    super(props);
    this.user = {
      id: 1,
      username: "triceratops1@gmail.com"
    }
  }

  render() {
    return (
      <Swiper style={styles.wrapper} loop={false} showsButtons={true}>
        <View style={styles.slide1}>
          <ECategoryView navigator={this.props.navigator} user={this.user}/>
        </View>
        <View style={styles.slide2}>
          <EChatHistoryView navigator={this.props.navigator} user={this.user} />
        </View>
        <View style={styles.slide3}>
          <EAccountView navigator={this.props.navigator} user={this.user}/>
        </View>
      </Swiper>
    )
  }
}

var styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});