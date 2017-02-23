import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper';

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
        <Text>Categories</Text>
      </View>
    )
    // return (
    //   <View>
        // <Text style={styles.header}>SAVVY SHOPPER</Text>
        // <Text style={styles.headerCopy}>Choose a category and ask a question</Text>
        // <ScrollView style={styles.wrapper}>
        // {categories.map(function(category) {
          //return (
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
          //)
        // })}
        // </ScrollView>
    //   </View>
    // )
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});