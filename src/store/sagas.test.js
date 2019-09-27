import * as Sagas from "./sagas";
import { put, select, takeLatest, fork, all } from "redux-saga/effects";
import rootSaga from "./sagas";

const setHistoryRatesExpectedObject = {
  base: "EUR",
  end_at: "2019-09-11",
  rates: {
    "2019-09-10": {
      RUB: 72.2447,
      USD: 1.104
    },
    "2019-09-11": {
      RUB: 71.8661,
      USD: 1.1003
    }
  },
  start_at: "2019-09-10"
};
it("Get rates", () => {
  const gen = Sagas.getRates("HKD");
  return gen.next().value.then(data => {
    expect(data).toBeTruthy();
    expect(gen.next(data).value).toBeTruthy();
    expect(gen.next()).toBeTruthy();
  });
});

it("Set history rates", () => {
  const gen = Sagas.setHistoryRates("2019-09-10", "2019-09-11", "USD", "RUB");
  return gen.next().value.then(data => {
    expect(data).toEqual(setHistoryRatesExpectedObject);
    expect(gen.next(setHistoryRatesExpectedObject).value).toEqual(
      put({
        type: "SET_HISTORY_RATES",
        payload: setHistoryRatesExpectedObject.rates
      })
    );
    expect(gen.next().value).toEqual(put({ type: "CALCULATE_CURRENCY" }));
    gen.next();
    expect(gen.next().value).toEqual(put({ type: "REMOVE_ERROR" }));
  });
});

it("Change currency", () => {
  const state = {
    currency: {
      historyFrom: "10-09-2019",
      historyTo: "10-10-2019",
      currencyFrom: "HKD",
      currencyTo: "USD"
    }
  };

  const gen = Sagas.changeCurrency();
  gen.next();
  expect(gen.next(state).value).toEqual(put({type:"SET_LOADING"}))
  gen.next();
  expect(gen.next().value).toEqual(put({type:"REMOVE_LOADING"}))
})

it("currencyChangeWatcher", () => {
  const gen = Sagas.currencyChangeWatcher();
  expect(gen.next().value).toEqual(
    takeLatest("CHANGE_CURRENCY", Sagas.changeCurrency)
  );
});

it("change amount", () => {
  const gen = Sagas.changeAmount({ payload: { value: 22 } });
  expect(gen.next().value).toEqual(put({ type: "REMOVE_ERROR" }));
  expect(gen.next().value).toEqual(put({ type: "CALCULATE_CURRENCY" }));
});

it("does not change amount", () => {
  const gen = Sagas.changeAmount({ payload: { value: -1 } });
  expect(gen.next().value).toEqual(
    put({ type: "SET_ERROR", payload: "Enter positive number" })
  );
});

it("changeAmountWatcherer", () => {
  const gen = Sagas.changeAmountWatcher();
  expect(gen.next().value).toEqual(
    takeLatest("CHANGE_AMOUNT", Sagas.changeAmount)
  );
});

it("switchCurrencies", () => {
  const state = {
    currency: {
      historyFrom: "10-09-2019",
      historyTo: "10-10-2019",
      currencyFrom: "HKD",
      currencyTo: ""
    }
  };
  const gen = Sagas.switchCurrencies();
  expect(gen.next().value).toEqual(select());
  gen.next(state);
  expect(gen.next().value).toEqual(put({ type: "CALCULATE_CURRENCY" }));
});

it("switchCurrenciesWathcer", () => {
  const gen = Sagas.switchCurrenciesWatcher();
  expect(gen.next().value).toEqual(
    takeLatest("SWITCH_CURRENCIES", Sagas.switchCurrencies)
  );
});

it("change history", () => {
  const state = {
    currency: {
      historyFrom: "10-09-2019",
      historyTo: "10-10-2019",
      currencyFrom: "HKD",
      currencyTo: ""
    }
  };
  const gen = Sagas.changeHistory();
  expect(gen.next().value).toEqual(select());
  gen.next(state);
});

it("changeHistoryToWatcher", () => {
  const gen = Sagas.changeHistoryToWatcher();
  expect(gen.next().value).toEqual(
    takeLatest("SET_HISTORY_TO", Sagas.changeHistory)
  );
});

it("changeHistoryFromWatcher", () => {
  const gen = Sagas.changeHistoryFromWatcher();
  expect(gen.next().value).toEqual(
    takeLatest("SET_HISTORY_FROM", Sagas.changeHistory)
  );
});

it("rootSaga should call all", () => {
  const gen = rootSaga();
  expect(gen.next().value).toEqual(
    all([
      fork(Sagas.currencyChangeWatcher),
      fork(Sagas.changeAmountWatcher),
      fork(Sagas.switchCurrenciesWatcher),
      fork(Sagas.changeHistoryToWatcher),
      fork(Sagas.changeHistoryFromWatcher)
    ])
  );
});
