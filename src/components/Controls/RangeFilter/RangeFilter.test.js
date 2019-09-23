import React from 'react';
import { shallow } from 'enzyme';
import RangeFilter from './RangeFilter';


describe('RangeFilter', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<RangeFilter/>).debug();
    expect(component).toMatchSnapshot();
  });
});