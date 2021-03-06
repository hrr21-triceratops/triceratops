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
const cancelIcon = require('../assets/imgs/cancel.png');
const LogoutIcon = require('../assets/imgs/Logout.png');
const BecomeExpertIcon = require('../assets/imgs/becomeExpert.png');
const userIcon = require('../assets/imgs/userIcon.png');
const expertiseIcon = require('../assets/imgs/expertise.png');
let connection = require('../Utils/connection');
var api = require('../Utils/api');
import TabsNav from './TabsNav';


export default class ProfileView extends Component {
constructor(props) {
  super(props);

  console.log('ProfileView Props:', props);

  this.state = {
    username: props.user.username,
    shopperExpert: props.user.shopperExpert,
    averageRating: '4.5',
    favorites: '5',
    chatHistory: '10',
    isActive: false,
    food: props.user.userPreferences.food || false,
    home: props.user.userPreferences.home || false,
    mensFashion: props.user.userPreferences.mensFashion || false,
    sports: props.user.userPreferences.sports || false,
    technology: props.user.userPreferences.technology || false,
    entertainment: props.user.userPreferences.entertainment || false,
    womensFashion: props.user.userPreferences.womensFashion || false,
    tags: []
  };
}

 makeExpert(userOptions, bool) {
    console.log('MAKE EXPERT', userOptions, bool);
    fetch(connection+'/api/users/' + this.props.user.id, { // this.props.id
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        attributes: {
          shopperExpert: bool
        }
      })
    })
    .then((response) => {
      if (response.status === 201) {
      this.setState({
          shopperExpert: bool
       });
        this.navigate('Home', this.props.user.id, this.props.user.username, this.props.user.averageRating, bool, this.props.user.active, this.props.user.closedChatSessions, this.props.user.userPreferences, this.props.user.profileImage);
      } else {
        AlertIOS.alert(
          'Account could not be updated.'
        )
      }
    })
    // .done();
  }


  navigate(scene, id, username, averageRating, shopperExpert, active, closedChatSessions, userPreferences, tags, profileImage) {
    if (id) {
      this.props.navigator.push({
        screen: scene,
        passProps: {
          user: {
            id: id,
            username: username,
            averageRating: averageRating,
            shopperExpert: shopperExpert,
            profileImage: profileImage,
            active: active,
            closedChatSessions: closedChatSessions,
            userPreferences: userPreferences,
            navigator: navigator,
            tags: tags
          }
        }
      });
    } else {
      this.props.navigator.push({
        screen: scene
      });
    }
  }

  componentDidMount() {
    this.getUserTags();
  }

  getUserTags() {
         return api.getUserTags("expert", this.props.user.id)
            .then((data) => {
              console.log('component mounted!', data.hits.hits);
              var listItems = data.hits.hits;
              var tags = [];

              if (tags.length == 20) {
                tags.pop();
              }

              for (var i = 0; i < listItems.length; i++) {
                console.log(listItems[i]["_source"].tag);
                tags.unshift(listItems[i]["_source"].tag);
                if (tags.length >= 20) {
                    break;
                }
              }
              console.log('tags', tags);
              if (tags) {
              this.setState({
                tags: tags
              });
            }
              return tags;
            }).catch((error) => {
            console.log('Request failed', error);
         });
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
    fetch(connection+'/api/users/preferences/update/' + this.props.user.id, { // this.props.id
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

  goToTags() {
   this.navigate('Tags', this.props.user.id, this.props.user.username, this.props.user.averageRating, this.props.shopperExpert, this.props.user.active, this.props.user.closedChatSessions, this.props.user.userPreferences, this.state.tags);
    //we should also destroy the session here. The above removes all routes from the stack
  }

  toggleFood() {
    this.setState({food: !this.state.food});
  }

render() {


  var username = this.state.username.indexOf('@') > -1 ? this.state.username.substring(0, this.state.username.indexOf('@')) : this.state.username

    var expert = this.state.shopperExpert ? "Expert" : "User"

return (
    <View style={styles.container}>
         <View style={styles.stats}>

            {this.renderOption({ icon: userIcon,
              value: " " + username.toUpperCase() + "\n" + expert })}

            {this.renderOption({ icon: ratingIcon, value: this.state.averageRating })}

            {this.renderOption({ icon: chatHistoryIcon, value: this.props.user.closedChatSessions.length })}

            {!this.state.shopperExpert ? this.renderOption({ icon: BecomeExpertIcon, value: 'Become Expert', method: this.makeExpert.bind(this, this.props, true) }) : this.renderOption({ icon: cancelIcon, value: 'Cancel Expert', method: this.makeExpert.bind(this, this.props, false) })}

            {/*this.renderOption({ icon: LogoutIcon, value: "Log Out", method: this.logOut.bind(this, this.props) })*/}

            {this.state.shopperExpert ? this.renderOption({ icon: expertiseIcon, value: "Expertise", method: this.goToTags.bind(this, this.props) }) : null}

        </View>
        {/*console.log('user this.props', this.props)*/}
        {/*console.log('user this.state', this.state)*/}
      <View style={styles.preferences}>
        <View style={styles.checkBoxContainer}>
         <View style={styles.checkBox}>
        <CheckBox
          title='Home'
          center
          containerStyle={{width: 150, height: 50}}
          checked={this.state.home}
          onPress={this.updatePreference.bind(this, this.props.user.userPreferences, "home", !this.state.home)}
        />

        <CheckBox
          title='Food'
          center
          containerStyle={{width: 150, height: 50}}
          checked={this.state.food}
          onPress={this.updatePreference.bind(this, this.props.user.userPreferences, "food", !this.state.food)}
        />

        <CheckBox
          title='Tech'
          center
          containerStyle={{width: 150, height: 50}}
          checked={this.state.technology}
          onPress={this.updatePreference.bind(this, this.props.user.userPreferences, "technology", !this.state.technology)}
        />

        <CheckBox
          title="Womens Fashion"
          center
          containerStyle={{width: 150, height: 50}}
          checked={this.state.womensFashion}
          onPress={this.updatePreference.bind(this, this.props.user.userPreferences, "womensFashion", !this.state.womensFashion)}
        />

        <CheckBox
          title="Mens Fashion"
          center
          containerStyle={{width: 150, height: 50}}
          checked={this.state.mensFashion}
          onPress={this.updatePreference.bind(this, this.props.user.userPreferences, "mensFashion", !this.state.mensFashion)}
        />

        <CheckBox
          title="Entertainment"
          center
          containerStyle={{width: 150, height: 50}}
          checked={this.state.entertainment}
          onPress={this.updatePreference.bind(this, this.props.user.userPreferences, "entertainment", !this.state.entertainment)}
        />

        {<CheckBox
          title="sports"
          center
          containerStyle={{width: 150, height: 50}}
          checked={this.state.sports}
          onPress={this.updatePreference.bind(this, this.props.user.userPreferences, "sports", !this.state.sports)}
        />}

         {<CheckBox
          title="Fitness"
          center
          containerStyle={{width: 150, height: 50}}
          checked={this.state.sports}
          onPress={this.updatePreference.bind(this, this.props.user.userPreferences, "sports", !this.state.sports)}
        />}

        {<CheckBox
          title="Vacation"
          center
          containerStyle={{width: 150, height: 50}}
          checked={this.state.sports}
          onPress={this.updatePreference.bind(this, this.props.user.userPreferences, "sports", !this.state.sports)}
        />}

        {<CheckBox
          title="Nightlife"
          center
          containerStyle={{width: 150, height: 50}}
          checked={this.state.sports}
          onPress={this.updatePreference.bind(this, this.props.user.userPreferences, "sports", !this.state.sports)}
        />}
        </View>
        </View>
      </View>

      <View style={styles.personal}>
        <View>
          <Text style={styles.name}>
             {//console.log('THIS USER STATE', this.state)
              }
            {/*this.state.username.indexOf('@') > -1 ? this.state.username.substring(0, this.state.username.indexOf('@')) : this.state.username}
               {this.state.shopperExpert ? " - Expert" : " - User"*/}
          </Text>
          <Text style={styles.occupation}>
              {/*this.state.shopperExpert ? "Expert" : "User"*/}
          </Text>
        </View>
        {/*<Image style={{width: 50, height: 60, marginLeft: 40}} source={{uri: this.props.user.profileImage}}/>*/}
      </View>
      <TabsNav navigator={this.props.navigator} user={this.props.user} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   flexDirection: 'column',
   backgroundColor: '#FFFFFF',
    ...StyleSheet.absoluteFillObject,
    top: null
 },
 checkBoxContainer: {
  top: 50,
  height: 400,
  width: 400,
  marginTop: 25
 },
 checkBox: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  alignSelf: 'center',
  flexWrap: 'wrap'
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
 padding: 20,
 backgroundColor: 'white',
 alignSelf: 'stretch',
 flexDirection: 'row'
},
name: {
 color: '#fff',
 fontFamily: 'Helvetica',
 fontSize: 30,
 fontWeight: 'bold',
},
 selected: {
 tintColor: '#00008B',
},
icon: {
 tintColor: '#00008B',
 height: 30,
 width: 30,
},
counter: {
 color: '#fff',
 fontSize: 15,
 marginTop: 5,
 fontSize: 13
},
stats: {
  flex: 1,
  flexDirection: 'row',
  justifyContent:'center'
},
stat: {
  alignItems: 'center',
  backgroundColor: '#48BBEC',
  flex: 1,
  padding: 9,
  textAlign: 'center'
}
});