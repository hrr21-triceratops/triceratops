import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableHighlight,
  AlertIOS,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';

//eventually, replace with a call to API for categories?
var categories = ['HOME', 'FOOD', 'TECH', 'WOMEN\'S FASHION', 'MEN\'S FASHION', 'ENTERTAINMENT'];

//current work around for dynamically loadign assets
let loadCategoryImage = function(category){
  switch(category){
    case 'home':
      return require('./../../assets/imgs/home.jpg');
    case 'men\'s\ fashion':
      return require('./../../assets/imgs/mens-fashion.jpg');
    case 'women\'s\ fashion':
      return require('./../../assets/imgs/womens-fashion.jpg');
    case 'tech':
      return require('./../../assets/imgs/tech.jpg');
    case 'food':
      return require('./../../assets/imgs/food.jpg');
    case 'entertainment':
      return require('./../../assets/imgs/entertainment.jpg');
  }
}

export default class ECategoryView extends Component {

  constructor(props) {
    super(props);
  }

  openChat() {
    this.props.navigator.push({
      name: 'EChat'
    });
  }

  render() {
    return (
      <View>
        <Text style={styles.header}>SAVVY SHOPPER</Text>
        <Text style={styles.headerCopy}>Choose a category and ask a question</Text>
        <ScrollView style={styles.wrapper}>
        {categories.map(function(category) {
          return (
            //Need to replace AlertIOS with function to call API and connect to chat with expert in category
            //Need to set current category on the state
            // <TouchableHighlight
            //   onPress={(this.openChat.bind(this))}
            //   style={styles.category}
            //   key={category}>
            //   <View>
            //     <Image style={styles.image} source={loadCategoryImage(category.toLowerCase())}></Image>
            //     <Text style={styles.buttonText}>{category}</Text>
            //   </View>
            // </TouchableHighlight>
          )
        })}
        </ScrollView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 30,
    color: '#FFFFFF',
  },
  headerCopy: {
    textAlign: 'center',
    marginTop: 7,
    fontSize: 16,
    color: '#FFFFFF',
  },
  buttonText: {
    flex: 1,
    padding: 4,
    fontSize: 22,
    color: 'white',
    borderColor: '#FFFFFF',
    alignSelf: 'stretch',
    backgroundColor: '#48BBEC',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    width: 310,
    height: 160,
  },
  category: {
    marginBottom: 14,
  },
  wrapper: {
    marginTop: 24,
  },
});