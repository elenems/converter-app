import * as Actions from "./currencyActions";

describe("Currency actions", () => {
  it("SET_HISTORY_RATES", () => {
    const payload = { name: "name" };
    const expectedAction = { type: "CHANGE_CURRENCY", payload };
    expect(Actions.setHistoryRates(payload)).toEqual(expectedAction);
  });

  it("SWITCH_CURRENCIES", () => {
    const expectedAction = { type: "SWITCH_CURRENCIES" };
    expect(Actions.switchCurrencies()).toEqual(expectedAction);
  });

  it("CHANGE_AMOUNT", () => {
    const e = {
      target: {
        id: "id",
        value: "value"
      }
    };
    const expectedAction = {
      type: "CHANGE_AMOUNT",
      payload: { id: e.target.id, value: e.target.value }
    };
    expect(Actions.handleAmountChange(e)).toEqual(expectedAction);
  });

  it("HANDLE_CURRENCY_CHANGE", () => {
    const e = {
      target: {
        id: "id",
        value: "value"
      }
    };
    const expectedAction = {
      type: "CHANGE_CURRENCY",
      payload: { name: e.target.name, value: e.target.value }
    };
    expect(Actions.handleCurrencyChange(e)).toEqual(expectedAction);
  });

  it("SET_HISTORY_FROM", () => {
    const payload = {
      historyFrom: "10-10-2012"
    };
    const expectedAction = {
      type: "SET_HISTORY_FROM",
      payload: payload.historyFrom
    };
    expect(Actions.setHistoryFrom(payload)).toEqual(expectedAction);
  });

  it("SET_HISTORY_TO", () => {
    const payload = {
      historyTo: "10-10-2018"
    };
    const expectedAction = {
      type: "SET_HISTORY_TO",
      payload: payload.historyTo
    };
    expect(Actions.setHistoryTo(payload)).toEqual(expectedAction);
  });
});
