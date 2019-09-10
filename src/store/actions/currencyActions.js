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
} from "../actions/actionTypes";
import axios from "axios";

export const setHistoryRates = () => (dispatch, getState) => {
  let {
    historyFrom,
    historyTo,
    currencyFrom,
    currencyTo
  } = getState().currency;
  historyFrom = new Date(historyFrom)
    .toLocaleDateString()
    .slice(0, 10)
    .split(".")
    .reverse()
    .join("-");
  historyTo = new Date(historyTo)
    .toLocaleDateString()
    .slice(0, 10)
    .split(".")
    .reverse()
    .join("-");
  if (historyFrom && currencyFrom && currencyTo) {
    dispatch({ type: SET_LOADING });
    const url = "https://api.exchangeratesapi.io";
    axios
      .get(
        `${url}/history?start_at=${historyFrom}&end_at=${historyTo}&symbols=${currencyTo},${currencyFrom}`
      )
      .then(data => {
        dispatch({ type: SET_HISTORY_RATES, payload: data.data.rates });
        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: REMOVE_LOADING });
      })
      .catch(() => {
        dispatch({
          type: SET_ERROR,
          payload: "Can't load history changes for these currencies"
        });
        dispatch({ type: REMOVE_LOADING });
      });
  }
};

export const switchCurrencies = payload => (dispatch, getState) => {
  dispatch({ type: SWITCH_CURRENCIES });
  axios
    .get(`https://api.exchangeratesapi.io/latest?base=${payload.currencyTo}`)
    .then(data => {
      dispatch({ type: SET_RATES, payload: data.data.rates });
      dispatch({ type: CALCULATE_CURRENCY });
      setHistoryRates()(dispatch, getState);
    });
};

export const handleAmountChange = e => dispatch => {
  const value = e.target.value;
  if (value !== "" && (value < 0 || isNaN(parseFloat(value)))) {
    dispatch({ type: SET_ERROR, payload: "Enter positive number" });
  } else {
    dispatch({
      type: CHANGE_AMOUNT,
      payload: { id: e.target.id, value: e.target.value }
    });
    dispatch({ type: REMOVE_ERROR });
    dispatch({ type: CALCULATE_CURRENCY });
  }
};

export const setHistoryFrom = payload => (dispatch, getState) => {
  dispatch({ type: SET_HISTORY_FROM, payload: payload.historyFrom });
  setHistoryRates()(dispatch, getState);
};

export const setHistoryTo = payload => (dispatch, getState) => {
  dispatch({ type: SET_HISTORY_TO, payload: payload.historyTo });
  setHistoryRates()(dispatch, getState);
};

export const handleCurrencyChange = e => (dispatch, getState) => {
  dispatch({
    type: CHANGE_CURRENCY,
    payload: { name: e.target.name, value: e.target.value }
  });

  if (e.target.name === "currencyFrom") {
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${e.target.value}`)
      .then(data => {
        dispatch({ type: SET_RATES, payload: data.data.rates });
        dispatch({ type: CALCULATE_CURRENCY });
      })
      .then(() => {
        setHistoryRates()(dispatch, getState);
      });
  }

  if (e.target.name === "currencyTo") {
    dispatch({ type: CALCULATE_CURRENCY });
    setHistoryRates()(dispatch, getState);
  }
};
