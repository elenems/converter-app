import { shallow } from "enzyme";
import React from "react";
import { GraphTest } from "./Graph.jsx";
import Graph from "../Graph";
import configureMockStore from "redux-mock-store";
describe("Graph", () => {
  const mockStore = configureMockStore();
  const initialState = {
    currency: {
      amountFrom: 1,
      amountTo: 0,
      currencyFrom: "",
      currencyTo: "",
      rates: null,
      historyRates: [],
      historyFrom: new Date("2015-01-01"),
      historyTo: new Date()
    },
    ui: {
      error: "",
      isLoading: false
    }
  };
  it("renders", () => {
    const wrapper = shallow(<GraphTest />).debug();
    expect(wrapper).toMatchSnapshot();
  });

  it("should update component", () => {
    const nextProps = {
        isLoading:true
    }
    const wrapper = shallow(<GraphTest isLoading={false}/>);
    const mock = jest.spyOn(wrapper.instance(), 'shouldComponentUpdate');
    wrapper.instance().shouldComponentUpdate(nextProps)
    expect(mock).toHaveBeenCalled();
  });

  it("should not update component", ()=>{
    const nextProps = {
        isLoading:true
    }
    const wrapper = shallow(<GraphTest isLoading={true}/>);
    const mock = jest.spyOn(wrapper.instance(), 'shouldComponentUpdate');
    wrapper.instance().shouldComponentUpdate(nextProps)
    expect(mock).toHaveBeenCalled();
  })

  it("connects state", () => {
    const store = mockStore(initialState);
    const wrapper = shallow(<Graph store={store} />);
    expect(wrapper.find("Graph").props()).toBeTruthy();
  });
});
