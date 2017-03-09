import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
// import Lightbox from 'react-native-lightbox';

export default class MessageImage extends React.Component {
  renderIcon() {
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
    const { width, height } = Dimensions.get('window');

    return (
      <View>
        <View style={[styles.container, this.props.containerStyle]}>
          <Image
            {...this.props.imageProps}
            style={[styles.image, this.props.imageStyle]}
            source={{uri: this.props.currentMessage.image}}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.props.onPressImage(this.props.currentMessage)}
        >
          {this.renderIcon()}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  imageActive: {
    resizeMode: 'contain',
  },
  wrapper: {
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    width: 28,
    height: 28,
    marginLeft: 5,
    marginBottom: -10,
    marginTop: 2,
  },
  iconText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 2,
  },
});

MessageImage.defaultProps = {
  currentMessage: {
    image: null,
  },
  containerStyle: {},
  imageStyle: {},
  imageProps: {},
  onPressImage: () => {console.log('ONPRESS')}
};

MessageImage.propTypes = {
  currentMessage: React.PropTypes.object,
  containerStyle: View.propTypes.style,
  imageStyle: Image.propTypes.style,
  onPressImage: React.PropTypes.func,
  imageProps: React.PropTypes.object
};
