import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  AlertIOS,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-elements';

export default class CustomActions extends React.Component {
  constructor(props) {
    super(props);
    this._images = [];
    this.state = {
      embedModal: false,
    };
    this.onActionsPress = this.onActionsPress.bind(this);
    this.selectImages = this.selectImages.bind(this);
  }

  setImages(images) {
    this._images = images;
  }

  getImages() {
    return this._images;
  }

  openEmbedModal(visible = false) {
    this.setState({embedModal: visible});
  }

  onActionsPress() {
    const options = ['Embed Image', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          this.openEmbedModal(true);
          break;
        default:
      }
    });
  }

  selectImages(images) {
    this.setImages(images);
  }

  renderIcon() {
    if (this.props.icon) {
      return this.props.icon();
    }
    return (
      <View
        style={[styles.wrapper, this.props.wrapperStyle]}
      >
        <Text
          style={[styles.iconText, this.props.iconTextStyle]}
        >
          +
        </Text>
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={this.onActionsPress}
      >
        <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.embedModal}
            >
            <View style={styles.mainContainer}>
              <View style={{justifyContent: 'center', marginTop: 5}}>
                <Text style={{marginBottom: -10}}>Image URL</Text>
                <TextInput
                  style={styles.searchInput}
                  onChangeText={(text) => {this._images[0] = {image: text}}}
                  placeholder={'link to image'}
                />
              </View>
              <Button
                backgroundColor='#00008B'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5, marginTop: 5 }}
                style={styles.button}
                onPress={() => {
                  this.props.onSend(this._images);
                  this.setImages([]);
                  this.setState({embedModal: false});
                }}
                raised title='Send Image' />
              <Button
                backgroundColor='#00008B'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5, marginTop: 5 }}
                style={styles.button}
                onPress={() => {
                  this.setImages([]);
                  this.setState({embedModal: false});
                }}
                raised title='Cancel' />
            </View>
          </Modal>

        {this.renderIcon()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  mainContainer: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    padding: 10,
    fontSize: 18,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 5,
    color: 'black',
    marginBottom: 5,
    marginTop: 10
  },
});

CustomActions.contextTypes = {
  actionSheet: React.PropTypes.func,
};

CustomActions.defaultProps = {
  onSend: () => {},
  options: {},
  icon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
};

CustomActions.propTypes = {
  onSend: React.PropTypes.func,
  options: React.PropTypes.object,
  icon: React.PropTypes.func,
  containerStyle: View.propTypes.style,
  wrapperStyle: View.propTypes.style,
  iconTextStyle: Text.propTypes.style,
};