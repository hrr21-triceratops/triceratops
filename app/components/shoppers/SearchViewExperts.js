import React, { Component, PropTypes  } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
} from 'react-native';
var api = require('../../Utils/api');
import {
  Button,
  FormLabel, FormInput, SearchBar
} from 'react-native-elements';
import SearchTopExperts from '../SearchTopExperts';
import Tabs from 'react-native-tabs';

export default class SearchViewExperts extends Component {
  constructor(props) {
    console.log('Top Experts Props:', props);
    super(props);
    this.state = {
      searchTerm: '',
      isLoading: false,
      error: false,
      query: '',
      expertList: [],
      expertsReturned: []
    };
  }

  handleChange(event) {
    this.setState({
      searchTerm: event.nativeEvent.text
    });
  }

  handleSubmit(event) {

    this.setState({
      isLoading: true
    });

    api.getExpertsByTag(this.state.searchTerm).then((experts) => {

      if (!experts.hits.hits.length) {

        this.setState({
          error: 'No Experts Found',
          isLoading: false
        });

      } else {

        var listItems = experts.hits.hits;
        var expertList = [];

        for (var i = 0; i < listItems.length; i++) {
          if (!expertList.includes(listItems[i]["_source"].userID)) {
            expertList.push(listItems[i]["_source"].userID);
          }
        }

        console.log('EXPERT LIST', expertList);

        this.setState({
          isLoading: false,
          error: false,
          searchTerm: '',
          expertList: expertList
        });

        console.log('this.state.expertList', this.state.expertList);
        this.getExperts(this.state.expertList);
      }

    });
  }

  getExperts(expertList) {
     var listToFind = [], expertsReturned = [];
     for (var i = 0; i < expertList.length; i++) {
      listToFind.push(api.getUser(expertList[i]));
     }

     Promise.all(listToFind).then(values => {
        for (var j = 0; j < values.length; j++) {
          expertsReturned = expertsReturned.concat(values[j]);
        }
        console.log('EXPERTS RETURNED', expertsReturned);

        this.setState({
          expertsReturned: expertsReturned
        });

        console.log('EXPERTS RETURNED STATE', this.state.expertsReturned);
      }, reason => {
        console.log(reason);
     });
  }

  navigateTo(destination, propsToPass) {
    this.props.navigator.push({
      screen: destination,
      passProps: {
        user: propsToPass
      }
    });
  }

  render() {
    var self = this;
    var displayErr = (
      this.state.error ? <Text>{this.state.error} </Text> : <View></View>
    );

    return (
      <View style={styles.mainContainer}>
        <Tabs selected={'Top Experts'}
         style={{backgroundColor:'#4F4F4F'}}
         selectedStyle={{color:'#53A9C9'}}
         onSelect={el=>this.setState({ page: el.props.name })}>

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
            name="Top Experts" style={styles.buttonText}
            user={this.props.user}
            onPress={this.navigateTo.bind(this, "TopExpertsSearch", this.props.user)}>
              Top Experts
          </Text>

          <Text name="Profile" style={styles.buttonText}
            presentationMaster
            user={this.props.user}
            onPress={(this.navigateTo.bind(this, "Profile", this.props.user))}>
              Profile
          </Text>
        </Tabs>
        <TextInput
            style={styles.searchInput}
            value={this.state.searchTerm}
            onChange={this.handleChange.bind(this)}
            placeholder="Search Experts" />
           <TouchableHighlight
              style={styles.button}
              onPress={this.handleSubmit.bind(this)}
              underlayColor="#88D4F5">
              <Text style={styles.buttonText}>Submit</Text>
           </TouchableHighlight>
        <View style={styles.secondContainer}>
            <SearchTopExperts navigator={self.props.navigator} user={self.props.user} searchTerm={this.state.searchTerm} expertsReturned={this.state.expertsReturned} />
       </View>
     </View>
    );
  }
}

var styles = StyleSheet.create({
    mainContainer: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 60
    },
    secondContainer: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
    searchInput: {
        height: 50,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: '#00008B'
    },
    buttonText: {
        fontSize: 14,
        color: '#FFFFFF',
        alignSelf: 'center'
    },
    button: {
        height: 50,
        top: null,
        marginTop: 0,
        backgroundColor: '#48BBEC',
        alignItems: 'center',
        justifyContent: 'center'
    },
});