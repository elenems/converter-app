import React from 'react';
import { shallow } from 'enzyme';
import Chart from './Chart';

describe('Chart', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Chart />).debug();
    expect(component).toMatchSnapshot();
  });
});