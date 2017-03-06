import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  NavigatorIOS,
  TouchableHighlight,
  TextInput,
  ActivityIndicatorIOS,
  Modal
} from 'react-native';
import { Card, Button } from 'react-native-elements';

let connection = require('../Utils/connection');
const items = [
  {
    title: 'Bose Quietcomfort 35',
    expert: 'Sally Lexington',
    image: 'https://images-na.ssl-images-amazon.com/images/I/61QwytXOcxL._SL1500_.jpg'
  },
  {
    title: 'Roku Streaming Stick',
    expert: 'Cortney Larson',
    image: 'https://images-na.ssl-images-amazon.com/images/I/61bDmdbgigL._SL1500_.jpg'
  },
  {
    title: '13" Laptop Case',
    expert: 'Frank Corgins',
    image: 'https://images-na.ssl-images-amazon.com/images/I/71MPLadVUcL._SL1500_.jpg'
  },
  {
    title: '40 Oz. Stainless Steel Thermos',
    expert: 'Amy Farha',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51Qd7clEAxL._SL1000_.jpg'
  },
  {
    title: 'Keurig K55 Coffee Maker',
    expert: 'Joe Robinson',
    image: 'https://images-na.ssl-images-amazon.com/images/I/61TVn2p8x%2BL._SL1109_.jpg'
  }
];

export default class TopExperts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };

    this.item = null;
    this.items = null;
  }

  componentWillMount() {
    // Load all items in wishlist
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  getWishlist() {
    // Get request for items in wishlist
  }

  showItem(item) {
    this.item = item;
    console.log('Current Item:', this.item);
    this.setModalVisible(true);
  }

  render () {
    return (
      <ScrollView style={{marginTop: 50}}>
        {items.map(function(item, index) {
          return (
            <Card key={index}>
              <Image source={{uri: item.image}}
              style={{width: 100, height: 100, marginLeft: 105, marginBottom: 10}} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>
                Recommended by {item.expert}
              </Text>
              <Button
                icon={{name: 'code'}}
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='MORE' />
            </Card>
          );
        }, this)}
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black'
  },
  name: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 28,
    textAlign: 'center',
    color: 'black'
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
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  icon: {
    tintColor: '#504f9f',
    height: 30,
    width: 30,
    marginTop: 15,
    marginLeft: 140
  },
  counter: {
    color: '#fff',
    fontSize: 15,
    marginTop: 5,
    marginLeft: 145
  },
  category: {
    fontSize: 12,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 5
  },
  bio: {
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
    marginTop: 15,
    marginBottom: 20
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 5
  }
});