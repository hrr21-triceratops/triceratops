import React, { Component, PropTypes  } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  NavigatorIOS,
  TouchableHighlight,
  TextInput,
  ActivityIndicatorIOS
} from 'react-native';
import Separator from './Separator';
import { List, ListItem } from 'react-native-elements';
var api = require('../Utils/api');


// In the video there are a couple errors, fixed them so it would build.
export default class Tags extends Component{
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            dataSource: this.ds.cloneWithRows(props.user.tags || []),
            tag: '',
            error: ''
        };
    }

    componentDidMount() {
        this.getUserTags();
    }

    getUserTags() {
        var self = this;
                var ds = this.ds;
         return api.getUserTags("expert", 2)
            .then((data) => {
              console.log('component mounted!', data.hits.hits);
              var listItems = data.hits.hits;
              var tags = [];

              for (var i = 0; i < listItems.length; i++) {
                tags.push(listItems[i]["_source"].tag);
              }
              console.log('JSON TAGS', JSON.stringify(tags));
              return tags;
            }).then(function(tags) {
                console.log('fucking tags', tags);
            self.setState({
                dataSource: ds.cloneWithRows(tags)
              });

            }).catch((error) => {
            console.log('Request failed', error);
         });
    }

    handleChange(e){
        this.setState({
            tag: e.nativeEvent.text
        });
    }

    handleSubmit(){
        var tag = this.state.tag;
        var ds = this.ds;
        var self = this;
        this.setState({
            tag: ''
        });
        api.addTag(2, this.props.user.username, "expert", tag)
            .then((data) => {
                return data
            }).then(function(data) {
                console.log('success tags.js', data);
                self.getUserTags();
            })
            .catch((error) => {
                console.log('Request failed', error);
            });
    }


    renderRow(rowData){
        return (
            <View>
                <View style={styles.rowContainer}>
                    <Text> {rowData} </Text>
                    <Separator />
                </View>
            </View>
        )
    }

    tagForm(){
        return (
            <View style={styles.footerContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.tag}
                    onChange={this.handleChange.bind(this)}
                    placeholder="Add Expertise" />
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    underlayColor="#88D4F5">
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableHighlight>
            </View>
        )
    }

    render(){
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                 />
                {this.tagForm()}
            </View>
        )
    }
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    button: {
        height: 60,
        backgroundColor: '#48BBEC',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        height: 60,
        padding: 10,
        fontSize: 18,
        color: '#111',
        flex: 10
    },
    rowContainer: {
        padding: 10,
        top: 60
    },
    footerContainer: {
        backgroundColor: '#E3E3E3',
        alignItems: 'center',
        flexDirection: 'row'
    },
    separator: {
        height: 1,
        backgroundColor: '#E4E4E4',
        flex: 1,
        marginLeft: 15
    }
});

