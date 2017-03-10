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
  Modal,
  AlertIOS,
} from 'react-native';
import Tabs from 'react-native-tabs';
import { Card, Button } from 'react-native-elements';

let connection = require('../Utils/connection');
const ratingIcon = require('../assets/imgs/plain-heart.png');

export default class TopExperts extends React.Component {
  constructor(props) {
    console.log('Wishlist Props:', props);
    super(props);
    this.state = {
      modalVisible: false,
      isLoading: true,
      purchase: false,
    };

    this.item = null;
    this.wishlist = null;
  }

  componentWillMount() {
    // LOAD ALL ITEMS IN USER'S WISHLIST
    this.getWishlist();
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  getWishlist() {
    var self = this;
    fetch(connection + '/api/wishlist/' + self.props.user.id, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((wishlist) => {
      self.wishlist = wishlist;
      console.log('Wishlist:', wishlist);
      self.setState({isLoading: false});
    })
    .done();
  }

  showItem(item) {
    this.item = item;
    console.log('Current Item:', this.item);
    this.setModalVisible(true);
  }

  removeItem() {
    var self = this;

    // remove from local wishlist array
    this.wishlist = this.wishlist.reduce((memo, item) => {
      if (this.item.title !== item.title) {
        memo.push(item);
      }
      return memo;
    }, []);

    // remove from database
    fetch(connection + '/api/wishlist/' + self.item._id, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
    })
    .done();

    this.setModalVisible(false);
    this.item = null;
  }

  navigateTo(destination, propsToPass, chatPartner) {
    if(destination === 'Chat') {
      fetch(connection + '/api/userQueue/loadUser/' + chatPartner.id, {
        method: 'GET'
      }).done();
    }
    if (!propsToPass) {
      console.log('destination', this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1]);

      if (destination !== this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1].screen) {
        this.props.navigator.push({
          screen: destination
        });
      }
    }
    if (!chatPartner) {
      console.log('destination', destination);
      console.log('destination2', destination, this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1].screen);
      console.log('props', propsToPass);
      if (destination !== this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1].screen) {
        this.props.navigator.push({
          screen: destination,
          passProps: {
            user: propsToPass
          }
        });
      }
    } else {
      console.log('destination', destination);
      console.log('destination2', destination, this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1].screen);

      console.log('props', propsToPass);

    if (destination !== this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length - 1].screen) {

      this.props.navigator.push({
          screen: destination,
          passProps: {
            user: propsToPass,
            chatPartner: chatPartner
          }
        });
      }
    }
  }

  render () {
    if (!this.wishlist || !this.wishlist.length) {
      return (
        <View style={styles.mainContainer}>
          <Text style={styles.subtitle}>-- No Items to Display --</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.mainContainer}>
          <Tabs selected={'Wishlist'}
         style={{backgroundColor:'#4F4F4F'}}
         selectedStyle={{color:'#53A9C9'}}>

          <Text
            name="Home" style={styles.buttonText}
            user={this.props.user}
            onPress={this.navigateTo.bind(this, "Home", this.props.user)}>
              Home
          </Text>

          <Text
            name="Wishlist" style={styles.buttonText}
            user={this.props.user}
            onPress={this.navigateTo.bind(this, "Wishlist", this.props.user)}>
              Wishlist
          </Text>

          <Text
            name="Profile" style={styles.buttonText}
            user={this.props.user}
            onPress={this.navigateTo.bind(this, "Profile", this.props.user)}>
              Profile
          </Text>
        </Tabs>
          <ScrollView style={{marginTop: 20, marginBottom: 20}}>
            {this.wishlist.map(function(item, index) {
              return (
                <Card key={index}>
                  <Image source={{uri: item.image}}
                  style={{width: 100, height: 100, marginLeft: 75, marginBottom: 10}} />
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subtitle}>
                    Recommended by {item.expert}
                  </Text>
                  <Button
                    icon={{name: 'code'}}
                    backgroundColor='#00008B'
                    buttonStyle={{borderRadius: 0, marginLeft: 10, marginRight: 10, marginBottom: 0}}
                    onPress={() => {this.showItem(item)}}
                    raised title='MORE' />
                </Card>
              );
            }, this)}
          </ScrollView>
          {this.item &&
            <Modal
              animationType={"slide"}
              transparent={false}
              visible={this.state.modalVisible}
              >
              <View style={styles.modalContainer}>
                <Image source={{uri: this.item.image}}
                  style={{width: 250, height: 250, marginLeft: 30, marginTop: 10}} />
                <Text style={styles.name}>{this.item.title}</Text>
                <Text style={styles.price}>{this.item.price}</Text>
                <Text style={styles.bio}>{this.item.comment}</Text>
                <Button
                  backgroundColor='#00008B'
                  buttonStyle={{borderRadius: 0, marginLeft: 10, marginRight: 10, marginBottom: 10, marginTop: 10 }}
                  style={styles.button}
                  onPress={() => {AlertIOS.alert('Item Purchased.');}}
                  raised title='Purchase' />
                <Button
                  backgroundColor='#00008B'
                  buttonStyle={{borderRadius: 0, marginLeft: 10, marginRight: 10, marginBottom: 10, marginTop: 10 }}
                  style={styles.button}
                  onPress={() => {this.removeItem()}}
                  raised title='Delete' />
                <Button
                  backgroundColor='#00008B'
                  buttonStyle={{borderRadius: 0, marginLeft: 10, marginRight: 10, marginBottom: 10, marginTop: 10 }}
                  style={styles.button}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                  raised title='Back' />
              </View>
            </Modal>
          }
        </View>
      );
    }
  }
}

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    padding: 30
  },
  modalContainer: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center'
  },
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
    fontSize: 14,
    color: '#FFFFFF',
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
  price: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray'
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
    marginTop: 10,
    marginBottom: 20
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 5
  }
});