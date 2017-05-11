/**
 * Created by warren on 5/9/17.
 */

import 'react-native'
import React from 'react'
import Login from '../app/redux/components/login'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

describe('testing login', () => {
  test('renders correctly', () => {
    const login = renderer.create(<Login/>);
    expect(login).toMatchSnapshot()
  })
});

