import React from 'react';
import { shallow } from 'enzyme';
import Chart from './Chart';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
describe('Chart', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Chart />).debug();
    expect(component).toMatchSnapshot();
  });
});