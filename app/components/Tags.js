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

// In the video there are a couple errors, fixed them so it would build.
export default class Tags extends Component{
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        this.state = {
            dataSource: this.ds.cloneWithRows(['row1', 'row2']),
            tag: '',
            error: ''
        }
    }
    handleChange(e){
        this.setState({
            tag: e.nativeEvent.text
        })
    }
    handleSubmit(){
        var tag = this.state.tag;
        this.setState({
            tag: ''
        });
        api.addTag(this.props.userInfo.login, tag)
            .then((data) => {
                api.getTags(this.props.userInfo.login)
                    .then((data) => {
                        this.setState({
                            dataSource: this.ds.cloneWithRows(data)
                        });
                    });
            })
            .catch((error) => {
                console.log('Request failed', error);
                this.setState({error});
            });
    }
    renderRow(rowData){
        return (
            <View>
                <View style={styles.rowContainer}>
                    <Text> {rowData} </Text>
                </View>
                <Separator />
            </View>
        )
    }
    footer(){
        return (
            <View style={styles.footerContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.tag}
                    onChange={this.handleChange.bind(this)}
                    placeholder="New Tag" />
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
                    renderHeader={() => <Badge userInfo={this.props.userInfo}/>} />
                {this.footer()}
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
        padding: 10
    },
    footerContainer: {
        backgroundColor: '#E3E3E3',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

