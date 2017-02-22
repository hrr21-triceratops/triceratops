import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';
import CategoryView from './shoppers/CategoryView';
import ChatHistoryView from './shoppers/ChatHistoryView';
import AccountView from './shoppers/AccountView';

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
          <CategoryView />
        </View>
        <View style={styles.slide2}>
          <ChatHistoryView />
        </View>
        <View style={styles.slide3}>
          <AccountView />
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