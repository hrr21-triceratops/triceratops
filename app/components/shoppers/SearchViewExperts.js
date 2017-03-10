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
      expertList: []
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
      }

    });
  }

  render() {

    var displayErr = (
      this.state.error ? <Text>{this.state.error} </Text> : <View></View>
    );

    return (
      <View style={styles.mainContainer}>
        <SearchBar
          value={this.state.searchTerm}
          onChange={this.handleChange.bind(this)} />
           <TouchableHighlight
            style={styles.button}
              onPress={this.handleSubmit.bind(this)}
              underlayColor="#88D4F5">
              <Text style={styles.buttonText}>Submit</Text>
           </TouchableHighlight>
        <View>
            <SearchTopExperts />
       </View>
     </View>
    );
  }

}
// var styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column'
//     },
//     buttonText: {
//         fontSize: 18,
//         color: 'white'
//     },
//     button: {
//         height: 60,
//         backgroundColor: '#48BBEC',
//         flex: 3,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     searchInput: {
//         height: 60,
//         padding: 10,
//         fontSize: 18,
//         color: '#111',
//         flex: 10
//     },
//     rowContainer: {
//         padding: 10,
//         top: 60
//     },
//     footerContainer: {
//         backgroundColor: '#E3E3E3',
//         alignItems: 'center',
//         flexDirection: 'row'
//     },
//     separator: {
//         height: 1,
//         backgroundColor: '#E4E4E4',
//         flex: 1,
//         marginLeft: 15
//     }
// });



var styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 60
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
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});