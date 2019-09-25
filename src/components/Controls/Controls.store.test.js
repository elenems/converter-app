import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import rootReducer from "../../store/reducers/rootReducer";
import Controls from "./Controls.store";
describe("Store actions", () => {
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
  it("SWITCH_CURRENCIES", () => {
    const store = mockStore(initialState);
    const wrapper = shallow(<Controls store={store} />).dive();
    expect(wrapper.props().switchCurrencies()).toEqual({
      type: "SWITCH_CURRENCIES"
    });
  });

  it("CHANGE_CURRENCY", () => {
    const e = {
      target: { name: 1, value: 1 }
    };
    const espectedObject = {
      type: "CHANGE_CURRENCY",
      payload: { name: e.target.name, value: e.target.value }
    };
    const store = mockStore(initialState);
    const wrapper = shallow(<Controls store={store} />).dive();
    expect(wrapper.props().handleCurrencyChange(e)).toEqual(espectedObject);
  });

  it("CHANGE_AMOUNT", () => {
    const e = {
      target: { id: 1, value: 1 }
    };
    const espectedObject = {
      type: "CHANGE_AMOUNT",
      payload: { id: e.target.id, value: e.target.value }
    };
    const store = mockStore(initialState);
    const wrapper = shallow(<Controls store={store} />).dive();
    expect(wrapper.props().handleAmountChange(e)).toEqual(espectedObject);
  });

  it("SET_HISTORY_FROM", () => {
    const payload = {
       historyFrom:'10-10-2018'
    }
    const espectedObject = {
      type: "SET_HISTORY_FROM",
      payload:payload.historyFrom
    };
    const store = mockStore(initialState);
    const wrapper = shallow(<Controls store={store} />).dive();
    expect(wrapper.props().setHistoryFrom(payload)).toEqual(espectedObject);
  });

  it("SET_HISTORY_TO", () => {
    const payload = {
       historyFrom:'10-10-2019'
    }
    const espectedObject = {
      type: "SET_HISTORY_TO",
      payload:payload.historyTo
    };
    const store = mockStore(initialState);
    const wrapper = shallow(<Controls store={store} />).dive();
    expect(wrapper.props().setHistoryTo(payload)).toEqual(espectedObject);
  });

});
