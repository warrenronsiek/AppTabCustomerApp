/**
 * Created by warren on 5/9/17.
 */
import 'react-native';
import React from 'react';
import Index from '../index.android.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
describe('testing root', () => {
  test('renders correctly', () => {
    const tree = renderer.create(
      <Index />
    );
    expect(tree).toMatchSnapshot()
  });
});
