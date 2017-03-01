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

export default class HomeView extends Component {
  constructor(props){
    super(props);
    this.state = { page:'Home' };
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

  render() {
            console.log('HOMEVIEW this.props', this.props)
    return (
       <View style={styles.mainContainer}>
        <Tabs selected={this.state.page}
         style={{backgroundColor:'white'}}
         selectedStyle={{color:'red'}}
         onSelect={el=>this.setState({ page: el.props.name })}>

            <TouchableHighlight
            name="Home"
            user={this.props}
            style={styles.button}
            onPress={this.navigateTo.bind(this, "Home")}
            underlayColor="white">
            <Text style={styles.buttonText}>Chat Now!</Text>
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