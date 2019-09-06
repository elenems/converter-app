import React from 'react';
import { shallow } from 'enzyme';
import Input from './Input';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
describe('Input', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Input debug />);
    expect(component).toMatchSnapshot();
  });
});