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
import { List, ListItem, Button } from 'react-native-elements';
import Tabs from 'react-native-tabs';

const ratingIcon = require('../assets/imgs/plain-heart.png');
let connection = require('../Utils/connection');

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/assets/imgs/female.jpg',
    subtitle: 'Home / Tech',
    rating: 5.0
  }
];

export default class SearchTopExperts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      expertsReturned: []
    };

    this.experts = null;
    this.expert = null;
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  showExpert(expert) {
    this.expert = expert;
    console.log('Current Expert:', this.expert);
    this.setModalVisible(true);
  }

  render () {
    return (
      <View>
       {console.log('search top experts this.props', this.props.expertsReturned)}
        <ScrollView style={{marginTop: 0}}>
          <List containerStyle={{marginTop: 0}}>
            {this.props.expertsReturned.map(function(expert, index) {
              return (
                <ListItem
                  roundAvatar
                  key={index}
                  title={expert.username}
                  subtitle={expert.username}
                  avatar={{uri:'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/assets/imgs/female.jpg'}}
                  badge={{value: parseInt(expert.averageRating), badgeTextStyle: {color: 'white'}, badgeContainerStyle: {marginLeft: -80}}}
                  onPress={() => {this.showExpert(expert)}}
                />
              );
            }, this)}
          </List>
        </ScrollView>
        {this.expert &&
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            >
            <View style={styles.mainContainer}>
              <Image source={{uri: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/assets/imgs/female.jpg' }}
                style={{width: 250, height: 250, marginLeft: 30, marginTop: 10}} />
              <Text style={styles.name}>{this.expert.name}</Text>
              <Text style={styles.category}>{this.expert.subtitle}</Text>
              <Image
                 source={ratingIcon}
                 style={styles.icon}
               />
              <Text style={styles.counter}>{this.expert.rating.toFixed(1)}</Text>
              <Text style={styles.bio}>
                I became an expert wesjdkf asdnf ansdf asdfn aksdf asdfna asdfn asdlfk asdnfn asla sndfalsdjkfn adauhgsdn asdfn jasdf naldasd anjksd asdfn uvsan jsaf naskdf udvad nasdfnl ajnsd ndsa sjndf.
              </Text>
              <Button
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10, marginTop: 10 }}
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

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginTop: 75,
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
  wrapper: {
    marginTop: 1,
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
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
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  },
  bio: {
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
    marginTop: 15,
    marginBottom: 20
  }
});