import React from 'react';
import { shallow } from 'enzyme';
import RangeFilter from './RangeFilter';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('RangeFilter', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<RangeFilter/>).debug();
    expect(component).toMatchSnapshot();
  });
});