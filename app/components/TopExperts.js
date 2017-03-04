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
  ActivityIndicatorIOS
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/images/f.jpg',
    subtitle: 'Home / Tech',
    rating: 5.0
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/images/m.jpg',
    subtitle: 'Food / Entertainment',
    rating: 4.8
  },
  {
    name: 'Cortney Larson',
    avatar_url: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/images/f.jpg',
    subtitle: 'Home / Tech',
    rating: 4.8
  },
  {
    name: 'Ben Thompson',
    avatar_url: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/images/m.jpg',
    subtitle: 'Men\'s Fashion / Food',
    rating: 4.7
  },
  {
    name: 'Sally Lexington',
    avatar_url: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/images/f.jpg',
    subtitle: 'Tech / Women\'s Fashion',
    rating: 4.7
  },
  {
    name: 'Jeff Sanders',
    avatar_url: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/images/m.jpg',
    subtitle: 'Entertainment',
    rating: 4.6
  },
  {
    name: 'Skylar Duncan',
    avatar_url: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/images/m.jpg',
    subtitle: 'Home / Entertainment',
    rating: 4.2
  },
  {
    name: 'Joe Robinson',
    avatar_url: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/images/m.jpg',
    subtitle: 'Food / Home',
    rating: 4.1
  },
  {
    name: 'Greg Anthony',
    avatar_url: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/images/m.jpg',
    subtitle: 'Men\'s Fashion',
    rating: 3.9
  },
  {
    name: 'Molly Morgans',
    avatar_url: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/images/f.jpg',
    subtitle: 'Entertainment / Women\'s Fashion',
    rating: 3.8
  },
  {
    name: 'Susan Thomas',
    avatar_url: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/images/f.jpg',
    subtitle: 'Food / Home',
    rating: 3.6
  },
  {
    name: 'Frank Corgins',
    avatar_url: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/images/m.jpg',
    subtitle: 'Men\'s Fashion / Tech',
    rating: 3.6
  },
  {
    name: 'Rusty Winfield',
    avatar_url: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/images/m.jpg',
    subtitle: 'Food / Entertainment',
    rating: 3.5
  },
  {
    name: 'Erica Bonnie',
    avatar_url: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/images/f.jpg',
    subtitle: 'Home / Women\'s Fashion',
    rating: 3.4
  },
  {
    name: 'Nancy Rogan',
    avatar_url: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/images/f.jpg',
    subtitle: 'Tech / Food',
    rating: 3.4
  },
  {
    name: 'Peter Parsons',
    avatar_url: 'https://raw.githubusercontent.com/aautem/triceratops/expertChat/app/images/m.jpg',
    subtitle: 'Entertainment / Home',
    rating: 3.4
  },
];

export default class TopExperts extends React.Component {
  constructor(props) {
    super(props);
  }

  getTopExperts(event) {
    this.props.navigator.push({"screen":"TopExperts"});
  }

  render () {
    return (
      <View>
        <Text style={styles.title}>Top Experts</Text>
        <ScrollView style={{marginBottom: 100}}>
          <List containerStyle={{marginTop: 15}}>
            {list.map(function(expert, index) {
              return (
                <ListItem
                  roundAvatar
                  key={index}
                  title={expert.name}
                  subtitle={expert.subtitle}
                  avatar={{uri:expert.avatar_url}}
                  badge={{value: expert.rating.toFixed(1), badgeTextStyle: {color: 'white'}, badgeContainerStyle: {marginLeft: -80}}}
                />
              );
            }, this)}
          </List>
        </ScrollView>
      </View>
    );
  }

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.title}>Top Experts</Text>
  //       <TouchableHighlight
  //           style={styles.button}
  //           onPress={this.getTopExperts.bind(this)}
  //           underlayColor="white">
  //           <Text style={styles.buttonText}>Discover</Text>
  //         </TouchableHighlight>
  //     </View>
  //   )
  // }
}

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
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
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
});