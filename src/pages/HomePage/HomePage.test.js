import HomePage from '../HomePage';
import {shallow} from 'enzyme';
import React from 'react';

describe("Home page", ()=>{
    it('renders', ()=>{
        const wrapper = shallow(<HomePage />).debug();
        expect(wrapper).toMatchSnapshot();
    })
})