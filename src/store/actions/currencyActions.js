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
  REMOVE_LOADING
} from "../actions/actionTypes";
import axios from "axios";

export const setHistoryRates = payload => dispatch => {
  const { historyFrom, currencyFrom, currencyTo } = payload;
  if (historyFrom && currencyFrom && currencyTo) {
    dispatch({type:SET_LOADING});
    const url = "https://api.exchangeratesapi.io";
    const currentDate = new Date()
      .toLocaleDateString()
      .split(".")
      .reverse()
      .join("-");
    axios
      .get(
        `${url}/history?start_at=${historyFrom}&end_at=${currentDate}&symbols=${currencyTo},${currencyFrom}`
      )
      .then(data => {
        dispatch({ type: SET_HISTORY_RATES, payload: data.data.rates });
        dispatch({ type: REMOVE_ERROR });
        dispatch({type:REMOVE_LOADING});
      })
      .catch(() => {
        dispatch({
          type: SET_ERROR,
          payload: "Can't load history changes for these currencies"
        });
        dispatch({type:REMOVE_LOADING});
      });
  }
};

export const switchCurrencies = payload => dispatch => {
  dispatch({ type: SWITCH_CURRENCIES });
  axios
    .get(`https://api.exchangeratesapi.io/latest?base=${payload.currencyTo}`)
    .then(data => {
      dispatch({ type: SET_RATES, payload: data.data.rates });
      dispatch({ type: CALCULATE_CURRENCY });
      setHistoryRates(payload)(dispatch);
    });
};

export const handleAmountChange = e => dispatch => {
  const value = e.target.value;
  if (value !== '' && (value < 0 || isNaN(parseFloat(value)))) {
    dispatch({ type: SET_ERROR, payload: "Enter positive number" });
  }else {
    dispatch({
      type: CHANGE_AMOUNT,
      payload: { id: e.target.id, value: e.target.value }
    });
    dispatch({type:REMOVE_ERROR})
    dispatch({ type: CALCULATE_CURRENCY });
  }
};

export const handleCurrencyChange = (e, payload) => dispatch => {
  const { historyFrom, currencyFrom, currencyTo } = payload;

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
        setHistoryRates({
          historyFrom,
          currencyTo,
          currencyFrom: e.target.value
        })(dispatch);
      });
  }

  if (e.target.name === "currencyTo") {
    dispatch({ type: CALCULATE_CURRENCY });
    setHistoryRates({ historyFrom, currencyTo: e.target.value, currencyFrom })(
      dispatch
    );
  }
};
