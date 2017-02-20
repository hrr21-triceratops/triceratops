import React, { Component } from 'react';

export default function getCategoryImage(category){
  switch(category){
    case 'home':
      return require('../../assets/imgs/home.jpg')
    case 'men\'s\ fashion':
      return require('../../assets/imgs/men\'s\ fashion.jpg')
    case 'women\'s\ fashion':
      return require('../../assets/imgs/women\'s\ fashion.jpg')
    case 'tech':
      return require('../../assets/imgs/tech.jpg')
    case 'food':
      return require('../../assets/imgs/food.jpg')
    case 'entertainment':
      return require('../../assets/imgs/entertainment.jpg')
  }
}

module.exports = getCategoryImage;