import { put, select, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

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

function getRates(currencyFrom) {
  return axios.get(
    `https://api.exchangeratesapi.io/latest?base=${currencyFrom}`
  );
}

function getHistoryRates(historyFrom, historyTo, currencyTo, currencyFrom) {
  const url = "https://api.exchangeratesapi.io";
  return axios.get(
    `${url}/history?start_at=${historyFrom}&end_at=${historyTo}&symbols=${currencyTo},${currencyFrom}`
  );
}

function* changeCurrency() {
  const { currency } = yield select();
  let { historyFrom, historyTo, currencyFrom, currencyTo } = currency;
  historyFrom = new Date(historyFrom).toISOString().slice(0, 10);
  historyTo = new Date(historyTo).toISOString().slice(0, 10);

  if (historyFrom && currencyFrom && currencyTo) {
    yield put({ type: SET_LOADING });
    let historyRates = null;
    yield getHistoryRates(
      historyFrom,
      historyTo,
      currencyTo,
      currencyFrom
    ).then(data => {
      historyRates = data;
    });
    if (historyRates.error) {
      yield put({
        type: SET_ERROR,
        payload: "Can't load history changes for these currencies"
      });
    } else {
      let rates = null;
      yield getRates(currencyFrom).then(data => {
        rates = data.data.rates;
      });
      yield put({ type: SET_HISTORY_RATES, payload: historyRates.data.rates });
      yield put({ type: SET_RATES, payload: rates });
      yield put({ type: CALCULATE_CURRENCY });
      yield put({ type: REMOVE_ERROR });
    }
    yield put({ type: REMOVE_LOADING });
  }
}

function* currencyChangeWatcher() {
  yield takeLatest(CHANGE_CURRENCY, changeCurrency);
}

function* changeAmount(payload) {
  const value = payload.payload.value;
  if (value !== "" && (value < 0 || isNaN(parseFloat(value)))) {
    yield put({ type: SET_ERROR, payload: "Enter positive number" });
  } else {
    yield put({ type: REMOVE_ERROR });
    yield put({ type: CALCULATE_CURRENCY });
  }
}

function* changeAmountWatcher() {
  yield takeLatest(CHANGE_AMOUNT, changeAmount);
}

function* switchCurrencies() {
  const { currency } = yield select();
  let { historyFrom, historyTo, currencyFrom, currencyTo } = currency;
  let rates = null;
  let historyRates = null;
  yield getRates(currencyFrom).then(data => {
    rates = data.data.rates;
  });
  historyFrom = new Date(historyFrom).toISOString().slice(0, 10);
  historyTo = new Date(historyTo).toISOString().slice(0, 10);
  if (historyFrom && currencyFrom && currencyTo) {
    yield getHistoryRates(
      historyFrom,
      historyTo,
      currencyTo,
      currencyFrom
    ).then(data => {
      historyRates = data;
    });
    if (historyRates.error) {
      yield put({
        type: SET_ERROR,
        payload: "Can't load history changes for these currencies"
      });
    } else {
      yield put({ type: SET_HISTORY_RATES, payload: historyRates.data.rates });
    }
  }

  yield put({ type: SET_RATES, payload: rates });
  yield put({ type: CALCULATE_CURRENCY });
}

function* switchCurrenciesWatcher() {
  yield takeLatest(SWITCH_CURRENCIES, switchCurrencies);
}

function* changeHistory() {
  const { currency } = yield select();
  let { historyFrom, historyTo, currencyFrom, currencyTo } = currency;
  let historyRates = null;
  historyFrom = new Date(historyFrom).toISOString().slice(0, 10);
  historyTo = new Date(historyTo).toISOString().slice(0, 10);
  if (historyFrom && currencyFrom && currencyTo) {
    yield getHistoryRates(
      historyFrom,
      historyTo,
      currencyTo,
      currencyFrom
    ).then(data => {
      historyRates = data;
    });
    if (historyRates.error) {
      yield put({
        type: SET_ERROR,
        payload: "Can't load history changes for these currencies"
      });
    } else {
      yield put({ type: SET_HISTORY_RATES, payload: historyRates.data.rates });
    }
  }
}

function* changeHistoryToWatcher() {
  yield takeLatest(SET_HISTORY_TO, changeHistory);
}

function* changeHistoryFromWatcher() {
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
