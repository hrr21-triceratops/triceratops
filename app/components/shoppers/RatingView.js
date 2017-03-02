import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

export default class RatingView extends Component {

  constructor(props) {
    super(props);
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

            <TouchableHighlight onPress={() => {
              this.props.closeModal()
            }}>

            <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>
      </View>
    );
  }
}