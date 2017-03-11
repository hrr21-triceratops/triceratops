import React, { Component, PropTypes  } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  ActivityIndicator
} from 'react-native';
var api = require('../../Utils/api');
import {
  Button,
  FormLabel, FormInput, SearchBar
} from 'react-native-elements';
import SearchTopExperts from '../SearchTopExperts';

export default class SearchViewExperts extends Component {
  constructor(props) {
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

  render() {
  navigateTo(destination, propsToPass) {
    this.props.navigator.push({
      screen: destination,
      passProps: {
        user: propsToPass
      }
    });
  }

    var displayErr = (
      this.state.error ? <Text>{this.state.error} </Text> : <View></View>
    );

    return (
      <View style={styles.mainContainer}>
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
            <SearchTopExperts navigator={this.props.navigator} user={this.props.user} searchTerm={this.state.searchTerm} expertsReturned={this.state.expertsReturned} />
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
        fontSize: 18,
        color: 'white'
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