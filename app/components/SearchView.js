import React, { Component, PropTypes  } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  NavigatorIOS,
  TouchableHighlight,
  TextInput,
  ActivityIndictorIOS
} from 'react-native';
import Search from './shoppers/Search';
import TopExperts from './TopExperts';
import AvailableExperts from './AvailableExperts';
import Tabs from 'react-native-tabs';
import { SearchBar } from 'react-native-elements'

const usersToHelp = null;

export default class SearchView extends Component {
  constructor(props){
    super(props);
    this.state = {
      page:'Search'
    };
  }

  navigateTo(destination, propsToPass) {

    if (!propsToPass) {
      console.log('destination', destination);
      this.props.navigator.push({
        screen: destination
      });
    } else {
      console.log('destination', destination);
      console.log('props', propsToPass);
      this.props.navigator.push({
          screen: destination,
          passProps: { user: propsToPass }
      });
    }
  }

  activeSwitcher() {
    this.setState({isActive: !this.state.isActive});
  }

  getActive() {
    return this.state.isActive;
  }

  render() {
    console.log('HOMEVIEW this.props', this.props);
    let button = null;
    if (this.getActive()) {
      button = <TouchableHighlight
            onPress={() => this.activeSwitcher()}
            style={styles.button}>
            <Text style={styles.buttonText}>Go Offline</Text>
          </TouchableHighlight>
    } else {
      button = <TouchableHighlight
            onPress={() => this.activeSwitcher()}
            style={styles.button}>
            <Text style={styles.buttonText}>Go Online</Text>
          </TouchableHighlight>
    }

    return (
      <View style={styles.mainContainer}>
        <Tabs selected={this.state.page}
         style={{backgroundColor:'white'}}
         selectedStyle={{color:'red'}}
         onSelect={el=>this.setState({ page: el.props.name })}>

          <TouchableHighlight
            name="Search"
            user={this.props}
            style={styles.button}
            onPress={this.navigateTo.bind(this, "Search")}
            underlayColor="white">
            <Text style={styles.buttonText}>Search</Text>
          </TouchableHighlight>

          <TouchableHighlight
            name="ByCategory"
            user={this.props}
            style={styles.button}
            onPress={this.navigateTo.bind(this, "ByCategory", this.props)}
            underlayColor="white">
            <Text style={styles.buttonText}>By Category</Text>
          </TouchableHighlight>

          <TouchableHighlight
            name="TopExperts"
            user={this.props}
            style={styles.button}
            onPress={this.navigateTo.bind(this, "TopExperts")}
            underlayColor="white">
            <Text style={styles.buttonText}>Top Experts</Text>
          </TouchableHighlight>
        </Tabs>
        <Search style={styles.searchInput} navigator={this.props.navigator} user={this.props}/>
        {this.props.shopperExpert && button}
        {this.getActive() &&
          <View>
            {fetch('https://savvyshopper.herokuapp.com/api/userQueue/loadUser', {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }).then((response) => {
              response.json();
              console.log("REPSONE", response);
            }).then((users) => {
              if(!users){
                console.log("TROUBLE");
              }
              console.log("USERS IN QUEUE", users);
              usersToHelp = users;
              // this.renderExpert();
            }).done()}
            <View>
              <Text>USER</Text>
              <Text>{JSON.stringify(usersToHelp)}</Text>
              <TouchableHighlight
              style={styles.button}
              onPress={() => this.navigateTo('Chat', this.props)}>
                <Text style={styles.buttonText}>b</Text>
              </TouchableHighlight>
              <TouchableHighlight
              style={styles.button}
              onPress={() => this.showNext()}>
                <Text style={styles.buttonText}>p</Text>
              </TouchableHighlight>
            </View>
          </View>
      }
      </View>
    );
  }
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
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
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
        fontSize: 14,
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
});