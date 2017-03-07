import React, { Component } from 'react';
import {
StyleSheet,
View,
Image,
Text,
AlertIOS,
TouchableHighlight
} from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
const userImage = require('../assets/imgs/user-profile.png');
const ratingIcon = require('../assets/imgs/plain-heart.png');
const chatHistoryIcon = require('../assets/imgs/chat.png');
let connection = require('../Utils/connection');

export default class ProfileView extends Component {
constructor(props) {
  super(props);

  console.log('ProfileView Props:', props);

  this.state = {
    username: 'triceratops2@gmail.com',
    shopperExpert: true,
    averageRating: '4.5',
    favorites: '5',
    chatHistory: '10',
    isActive: false,
    food: props.user.user.userPreferences.food,
    home: props.user.user.userPreferences.home,
    mensFashion: props.user.user.userPreferences.mensFashion,
    sports: props.user.user.userPreferences.sports,
    technology: props.user.user.userPreferences.technology,
    entertainment: props.user.user.userPreferences.entertainment,
    womensFashion: props.user.user.userPreferences.womensFashion
  };
}

 makeExpert(userOptions) {
    // console.log('MAKE EXPERT', userOptions);
    fetch(connection+'/api/users/' + this.props.user.user.id, { // this.props.user.id
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        attributes: {
          shopperExpert: !userOptions.user.user.shopperExpert
        }
      })
    })
    .then((response) => {
      if (response.status === 201) {
        console.log('')
        this.navigate('Home', this.props.user.user.id, this.props.user.user.username, this.props.user.user.averageRating, true, this.props.user.user.active, this.props.user.user.closedChatSessions, this.props.user.user.userPreferences);
      } else {
        AlertIOS.alert(
          'Account could not be updated.'
        )
      }
    })
    .done();
  }

  navigate(scene, id, username, averageRating, shopperExpert, active, closedChatSessions, userPreferences) {
    if (id) {
      this.props.navigator.push({
        screen: scene,
        passProps: {
          user: {
            id: id,
            username: username,
            averageRating: averageRating,
            shopperExpert: shopperExpert,
            active: active,
            closedChatSessions: closedChatSessions,
            userPreferences: userPreferences,
            navigator: navigator
          }
        }
      });
    } else {
      this.props.navigator.push({
        screen: scene
      });
    }
  }

 renderOption(options) {
    return (
      <View style={styles.stat}>
      <TouchableHighlight onPress={options.method}>
        <Image
          source={options.icon}
          style={[styles.icon, options.selected ?
          styles.selected : null]}
        />
      </TouchableHighlight>
      <Text style={styles.counter}>{options.value}</Text>
      </View>
     );
  }

  activeSwitcher() {
    this.setState({isActive: !this.state.isActive});
  }

  getActive() {
    return this.state.isActive;
  }

  updatePreference(userPreferences, category, bool) {
    // console.log('preference update!', userPreferences)
    // console.log('category', category, bool )
    fetch(connection+'/api/users/preferences/update/' + this.props.user.user.id, { // this.props.user.id
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify({
        'preferences': userPreferences,
        'category': category,
        'bool': bool
      })
    })
    .then((response) => {
      if (response.status === 201) {
          // console.log('COMPLETE!', response, [`${category}`])
          var key = category
          var val = bool
          var obj  = {}
          obj[key] = val
          this.setState(obj)
          console.log('update preferences this.state', this.state);
      } else {
        AlertIOS.alert(
          'Account could not be updated.'
        )
      }
    })
    .done();
    }

  logOut() {
    this.props.navigator.resetTo({
      screen: "Login"
    })
    //we should also destroy the session here. The above removes all routes from the stack
  }

  toggleFood() {
    this.setState({food: !this.state.food});
  }

render() {

return (

    <View style={styles.container}>
        {/*console.log('user this.props', this.props)*/}
        {/*console.log('user this.state', this.state)*/}
      <View style={styles.preferences}>
        <CheckBox
          center
          title='Home'
          checked={this.state.home}
          onPress={this.updatePreference.bind(this, this.props.user.user.userPreferences, "home", !this.state.home)}
        />

        <CheckBox
          center
          title='Food'
          checked={this.state.food}
          onPress={this.updatePreference.bind(this, this.props.user.user.userPreferences, "food", !this.state.food)}
        />

        <CheckBox
          center
          title='Tech'
          checked={this.state.technology}
          onPress={this.updatePreference.bind(this, this.props.user.user.userPreferences, "technology", !this.state.technology)}
        />

        <CheckBox
          center
          title="Womens Fashion"
          checked={this.state.womensFashion}
          onPress={this.updatePreference.bind(this, this.props.user.user.userPreferences, "womensFashion", !this.state.womensFashion)}
        />

        <CheckBox
          center
          title="Mens Fashion"
          checked={this.state.mensFashion}
          onPress={this.updatePreference.bind(this, this.props.user.user.userPreferences, "mensFashion", !this.state.mensFashion)}
        />

        <CheckBox
          center
          title="Entertainment"
          checked={this.state.entertainment}
          onPress={this.updatePreference.bind(this, this.props.user.user.userPreferences, "entertainment", !this.state.entertainment)}
        />

        <CheckBox
          center
          title="sports"
          checked={this.state.sports}
          onPress={this.updatePreference.bind(this, this.props.user.user.userPreferences, "sports", !this.state.sports)}
        />
      </View>

      <View style={styles.personal}>
        <Text style={styles.name}>
          {this.state.username.substring(0, this.state.username.indexOf('@'))}
        </Text>
        <Text style={styles.occupation}>
            {this.state.shopperExpert ? "Expert" : "User"}
        </Text>
      </View>
        <View style={styles.stats}>
            {this.renderOption({ icon: ratingIcon, value: this.props.user.user.averageRating })}

            {this.renderOption({ icon: chatHistoryIcon, value: this.props.user.user.closedChatSessions.length })}

            {!this.props.user.user.shopperExpert ? this.renderOption({ icon: chatHistoryIcon, value: 'Become Expert', method: this.makeExpert.bind(this, this.props) }) : this.renderOption({ icon: chatHistoryIcon, value: 'Cancel Expert', method: this.makeExpert.bind(this, this.props) })}

            {this.renderOption({ icon: chatHistoryIcon, value: "Log Out", method: this.logOut.bind(this, this.props) })}

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#FFFFFF',
    ...StyleSheet.absoluteFillObject,
    top: null
 },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    color: 'grey',
    top: 20,
    marginBottom: 2
  },
preferences: {
  marginTop:2,
  marginBottom: 2
},
personal: {
 padding: 30,
 backgroundColor: 'rgba(0,0,0,0.5)',
 alignSelf: 'stretch',
},
name: {
 color: '#fff',
 fontFamily: 'Helvetica',
 fontSize: 30,
 fontWeight: 'bold',
},
occupation: {
 color: '#d6ec1b',
 marginTop: 5,
},
 selected: {
 tintColor: '#d6ec1b',
},
icon: {
 tintColor: '#504f9f',
 height: 30,
 width: 30,
},
counter: {
 color: '#fff',
 fontSize: 15,
 marginTop: 5,
},
stats: {
  flexDirection: 'row',
},
stat: {
  alignItems: 'center',
  backgroundColor: '#48BBEC',
  borderColor: '#6e6db1',
  borderLeftWidth: 1,
  flex: 1,
  padding: 10,
}
});