import React, { Component } from 'react';
import StarRating from 'react-native-star-rating';

export default class StarView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 0
    };
  }

  onStarRatingPress(userId, expertId, rating) {
    console.log('userId', userId, 'expertId', expertId, 'rating', rating);
    this.setState({
      starCount: rating
    });

    fetch('http://localhost:2300/api/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: messages
      })
    })
    .then((responseData) => {
      console.log(responseData);
      this.navigate();
    })
    .done();

  }

  render() {
    return (
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(this.props.userId, this.props.expertId, rating)}
      />
    );
  }
}

