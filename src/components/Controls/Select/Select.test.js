import React from 'react';
import { shallow } from 'enzyme';
import {currencies} from '../../../data/currencies';
import Select from './Select';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
describe('Select', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Select values = {currencies} />).debug();
    expect(component).toMatchSnapshot();
  });
});