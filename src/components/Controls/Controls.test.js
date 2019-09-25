import React from "react";
import Controls from "./Controls";
import { shallow } from "enzyme";


describe("Controls", () => {
  it("renders", () => {
    const wrapper = shallow(<Controls />).debug();
    expect(wrapper).toMatchSnapshot();
  });

  it("handleSelectChange called", () => {
    const mock = jest.fn();
    const wrapper = shallow(<Controls handleCurrencyChange={() => mock()}/>);
    wrapper.instance().handleSelectChange();
    expect(mock).toHaveBeenCalled();
  });

  it("handleChange called", () => {
    const mock = jest.fn();
    const wrapper = shallow(<Controls handleAmountChange={() => mock()}/>);
    wrapper.instance().handleChange();
    expect(mock).toHaveBeenCalled();
  });

  it("setHistoryFrom called", () => {
    const mock = jest.fn();
    const wrapper = shallow(<Controls setHistoryFrom={() => mock()}/>);
    wrapper.instance().setHistoryFrom();
    expect(mock).toHaveBeenCalled();
  });

  it("setHistoryTo called", () => {
    const mock = jest.fn();
    const wrapper = shallow(<Controls setHistoryTo={() => mock()}/>);
    wrapper.instance().setHistoryTo();
    expect(mock).toHaveBeenCalled();
  });

  it("switchCurrecnies called", () => {
    const mock = jest.fn();
    const wrapper = shallow(<Controls switchCurrencies={() => mock()} />);
    wrapper.instance().switchCurrencies();
    expect(mock).toHaveBeenCalled();
  });
});
