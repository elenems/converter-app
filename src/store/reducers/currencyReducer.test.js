import reducer from "./currencyReducer";
import * as types from "../actions/actionTypes";
const dateFrom = new Date("2015-01-01");
const dateTo = new Date();

describe("currency reducer", () => {
  let initState;
  beforeEach(() => {
    initState = {
      amountFrom: 1,
      amountTo: 0,
      currencyFrom: "",
      currencyTo: "",
      rates: null,
      historyRates: [],
      historyFrom: dateFrom,
      historyTo: dateTo
    };
  });
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it("should handle SWITCH_CURRENCIES", () => {
    const state = Object.assign({}, initState);
    state.currencyFrom = "USD";
    state.currencyTo = "HKD";
    expect(
      reducer(state, {
        type: types.SWITCH_CURRENCIES
      })
    ).toEqual({
      ...state,
      currencyFrom: state.currencyTo,
      currencyTo: state.currencyFrom
    });
  });

  it("should handle SET_HISTORY_RATES", () => {
    const state = Object.assign({}, initState);
    const payload = {
      historyRates: []
    };
    expect(
      reducer(state, {
        type: types.SET_HISTORY_RATES,
        historyRates: payload
      })
    ).toEqual({
      ...state,
      historyRates: payload.historyRates
    });
  });

  it("should handle CHANGE_AMOUNT", () => {
    const state = Object.assign({}, initState);
    const payload = {
      id: "amountFrom",
      value: 2000
    };
    expect(
      reducer(state, {
        type: types.CHANGE_AMOUNT,
        payload
      })
    ).toEqual({
      ...state,
      amountFrom: 2000
    });
  });

  it("should handle CHANGE_CURRENCY", () => {
    const state = Object.assign({}, initState);
    const payload = {
      id: "currencyFrom",
      value: "HKD"
    };
    expect(
      reducer(state, {
        type: types.CHANGE_AMOUNT,
        payload
      })
    ).toEqual({
      ...state,
      currencyFrom: "HKD"
    });
  });

  it("should handle SET_RATES", () => {
    const state = Object.assign({}, initState);
    const payload = [];
    expect(
      reducer(state, {
        type: types.SET_RATES,
        payload
      })
    ).toEqual({
      ...state,
      rates: []
    });
  });

  it("should handle CALCULATE_CURRENCY", () => {
    const state = Object.assign({}, initState);
    state.currencyTo = "USD";
    state.rates = { USD: 2 };
    expect(
      reducer(state, {
        type: types.CALCULATE_CURRENCY
      })
    ).toEqual({
      ...state,
      amountTo: 2
    });
  });

  it("should handle SET_HISTORY_FROM", () => {
    const state = Object.assign({}, initState);
    const payload = "10-10-2018";

    expect(
      reducer(state, {
        type: types.SET_HISTORY_FROM,
        payload
      })
    ).toEqual({
      ...state,
      historyFrom: "10-10-2018"
    });
  });

  it("should handle SET_HISTORY_TO", () => {
    const state = Object.assign({}, initState);
    const payload = "10-09-2019";

    expect(
      reducer(state, {
        type: types.SET_HISTORY_TO,
        payload
      })
    ).toEqual({
      ...state,
      historyTo: "10-09-2019"
    });
  });
});
