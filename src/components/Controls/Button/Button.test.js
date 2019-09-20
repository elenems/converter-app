import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";

configure({ adapter: new Adapter() });
describe('Button', () => {

  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Button />).debug();
    expect(component).toMatchSnapshot();
  });

  it('renders left chevron icon', () => {
    const component = shallow(<Button />);
    expect(component.find(MdChevronLeft).exists()).toEqual(true);
  });

  it('renders right chevron icon', () => {
    const component = shallow(<Button />);
    expect(component.find(MdChevronRight).exists()).toEqual(true);
  });
});