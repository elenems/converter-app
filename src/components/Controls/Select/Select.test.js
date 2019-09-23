import React from 'react';
import { shallow } from 'enzyme';
import {currencies} from '../../../data/currencies';
import Select from './Select';

describe('Select', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Select values = {currencies} />).debug();
    expect(component).toMatchSnapshot();
  });
});