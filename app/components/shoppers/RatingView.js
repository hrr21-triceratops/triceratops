import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';
import { Button } from 'react-native-elements';
import StarView from './StarView.js';

export default class RatingView extends Component {
  constructor(props) {
    super(props);
  }

  sendRating(userId, expertId) {
    console.log(userId, expertId);
    //optional - still thinking about sending it here on in StarView
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.modalVisible}
          >

         <View style={{marginTop: 22}}>
          <View>

            <Text>Rate your Expert!</Text>

            {console.log('user props', this.props)}

            <StarView user={this.props} userId={this.state.userId} expertId={this.state.expertId}/>

            <Button
            raised
            backgroundColor='#48BBEC'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10, marginTop: 10}}
            title="Submit Rating"
            onPress={() => {
              this.props.closeModal()
              this.sendRating(this.props.userId, this.props.expertId)
            }}>
            </Button>

          </View>
         </View>
        </Modal>
      </View>
    );
  }
}