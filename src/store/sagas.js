import { put, select, takeLatest, all } from "redux-saga/effects";

import {
  SWITCH_CURRENCIES,
  CHANGE_AMOUNT,
  CHANGE_CURRENCY,
  SET_RATES,
  CALCULATE_CURRENCY,
  SET_HISTORY_RATES,
  SET_ERROR,
  REMOVE_ERROR,
  SET_LOADING,
  REMOVE_LOADING,
  SET_HISTORY_FROM,
  SET_HISTORY_TO
} from "./actions/actionTypes";

export const getRates = function* getRates(currencyFrom) {
  const rates = yield fetch(
    `https://api.exchangeratesapi.io/latest?base=${currencyFrom}`
  ).then(data => {
    return data.json();
  });
  yield put({ type: SET_RATES, payload: rates.rates });
}

export const setHistoryRates = function* setHistoryRates(historyFrom, historyTo, currencyTo, currencyFrom) {
  const url = "https://api.exchangeratesapi.io";
  const historyRates = yield fetch(
    `${url}/history?start_at=${historyFrom}&end_at=${historyTo}&symbols=${currencyTo},${currencyFrom}`
  ).then(data => {
    return data.json();
  });
  if (historyRates.error) {
    yield put({
      type: SET_ERROR,
      payload: "Can't load history changes for these currencies"
    });
  } else {
    yield put({ type: SET_HISTORY_RATES, payload: historyRates.rates });
    yield put({ type: CALCULATE_CURRENCY });
    yield getRates(currencyFrom);
    yield put({ type: REMOVE_ERROR });
  }
}

export const changeCurrency = function* changeCurrency() {
  const { currency } = yield select();
  let { historyFrom, historyTo, currencyFrom, currencyTo } = currency;
  historyFrom = new Date(historyFrom).toISOString().slice(0, 10);
  historyTo = new Date(historyTo).toISOString().slice(0, 10);

  if (historyFrom && currencyFrom && currencyTo) {
    yield put({ type: SET_LOADING });
    yield setHistoryRates(historyFrom, historyTo, currencyTo, currencyFrom);
    yield put({ type: REMOVE_LOADING });
  }
}

export const currencyChangeWatcher = function* currencyChangeWatcher() {
  yield takeLatest(CHANGE_CURRENCY, changeCurrency);
}

export const changeAmount = function* changeAmount(payload) {
  const value = payload.payload.value;
  if (value !== "" && (value < 0 || isNaN(parseFloat(value)))) {
    yield put({ type: SET_ERROR, payload: "Enter positive number" });
  } else {
    yield put({ type: REMOVE_ERROR });
    yield put({ type: CALCULATE_CURRENCY });
  }
}

export const changeAmountWatcher = function* changeAmountWatcher() {
  yield takeLatest(CHANGE_AMOUNT, changeAmount);
}

export const switchCurrencies = function* switchCurrencies() {
  const { currency } = yield select();
  let { historyFrom, historyTo, currencyFrom, currencyTo } = currency;
  yield getRates(currencyFrom);
  historyFrom = new Date(historyFrom).toISOString().slice(0, 10);
  historyTo = new Date(historyTo).toISOString().slice(0, 10);
  if (historyFrom && currencyFrom && currencyTo) {
    yield setHistoryRates(historyFrom, historyTo, currencyTo, currencyFrom);
  }
  yield put({ type: CALCULATE_CURRENCY });
}

export const switchCurrenciesWatcher = function* switchCurrenciesWatcher() {
  yield takeLatest(SWITCH_CURRENCIES, switchCurrencies);
}

export const changeHistory = function* changeHistory() {
  const { currency } = yield select();
  let { historyFrom, historyTo, currencyFrom, currencyTo } = currency;
  historyFrom = new Date(historyFrom).toISOString().slice(0, 10);
  historyTo = new Date(historyTo).toISOString().slice(0, 10);
  if (historyFrom && currencyFrom && currencyTo) {
    yield setHistoryRates(historyFrom, historyTo, currencyTo, currencyFrom);
  }
}

export const changeHistoryToWatcher = function* changeHistoryToWatcher() {
  yield takeLatest(SET_HISTORY_TO, changeHistory);
}

export const changeHistoryFromWatcher = function* changeHistoryFromWatcher() {
  yield takeLatest(SET_HISTORY_FROM, changeHistory);
}



export default function* rootSaga() {
  yield all([
    currencyChangeWatcher(),
    changeAmountWatcher(),
    switchCurrenciesWatcher(),
    changeHistoryToWatcher(),
    changeHistoryFromWatcher()
  ]);
}
