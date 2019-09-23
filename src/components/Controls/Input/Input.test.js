import React from 'react';
import { shallow } from 'enzyme';
import Input from './Input';

describe('Input', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Input />).debug();
    expect(component).toMatchSnapshot();
  });
});