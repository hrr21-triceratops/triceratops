import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

var sum = function(a, b) {
  return a + b;
}

test('adds 1 + 2 to get 3', () => {
  expect(sum(1, 2)).toBe(3);
});

//import all the views you want to test
import Index from '../index.ios.js';
import ShopperView from '../components/ShopperView.js';
import CategoryView from '../components/shoppers/CategoryView.js';

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  ).toJSON();
});

// Test the shopper view
describe('Shopper View', () => {
  // let shopperView;

  // function renderView(props, states){

  // }
  const tree = renderer.create(
      <ShopperView />
    ).toJSON();
  // should render 3 views
  it('should render 3 views', () => {
    // category, chat, prefs
    expect(tree.children.length).toEqual(3);
  });
  it('should have a type of view', () => {
    expect(tree.type).toBe('View');
  });
});

describe('Category View', () => {
  // function renderView(view){
  //   console.log("CategoryView", CategoryView);
  //   console.log("view", view);
  //   return view.render();
  // }

  const tree = renderer.create(
      <ShopperView />
    ).toJSON();
  const categoryTree = tree.children;
  // should render 3 views
  it('should have a type of view', () => {
    console.log("CATEGORY TREE", categoryTree);
    expect(categoryTree.type).toBe('View');
  });
});