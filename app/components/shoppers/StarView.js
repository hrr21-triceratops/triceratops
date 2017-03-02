import React, { Component } from 'react';
import StarRating from 'react-native-star-rating';

export default class StarView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5
    };
  }

  onStarRatingPress(userId, expertId, rating) {
    console.log('rating', rating);
    this.setState({
      starCount: rating
    });
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

