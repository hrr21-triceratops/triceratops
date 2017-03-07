import React, { Component } from 'react';
import {
StyleSheet,
View,
Image,
Text,
ListView,
TextInput,
TouchableHighlight
} from 'react-native';


export default class Tags extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']), //pass the data you get back from the DB
      tag: '',
      error: ''
    };
  }

  handleChange(e) {
    this.setState({
      tag: e.nativeEvent.text
    });
  }

  handleSubmit() {
    var tag = this.state.tag;
    this.setState({
      tag: ''
    });

    // api.addTag(this.)
  }

  renderRow(rowData) {
  }

  footer() {
    return (
      <View style={styles.footContainer}>
      <TextInput style={styles.searchInput}
      value={this.state.tag}
      onChange={this.handleChange.bind(this)}
      placeholder="New Tag"/>
      <TouchableHighlight
        style={styles.button}
        onPress={this.handleSubmit.bind(this)}
        underlayColor="#88D4F5">
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
       {this.footer()}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
          renderHeader={() => <Text>Tags</Text>}
        />
      </View>
    );
  }
}