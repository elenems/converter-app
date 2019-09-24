import NotFoundPage from '../NotFoundPage';
import {shallow} from 'enzyme';
import React from 'react';

describe("NotFoundPage", ()=>{
    it('renders', ()=>{
        const wrapper = shallow(<NotFoundPage />).debug();
        expect(wrapper).toMatchSnapshot();
    })
})