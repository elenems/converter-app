import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";

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