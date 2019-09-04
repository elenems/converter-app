import {
  SWITCH_CURRENCIES,
  CHANGE_AMOUNT,
  CHANGE_CURRENCY,
  SET_RATES,
  CALCULATE_CURRENCY
} from "../actions/actionTypes";
import axios from "axios";

export const switchCurrencies = payload => dispatch => {
  dispatch({ type: SWITCH_CURRENCIES });
  axios
    .get(`https://api.exchangeratesapi.io/latest?base=${payload}`)
    .then(data => {
      dispatch({ type: SET_RATES, payload: data.data.rates });
      dispatch({ type: CALCULATE_CURRENCY });
    });
};

export const handleAmountChange = e => dispatch => {
  dispatch({
    type: CHANGE_AMOUNT,
    payload: { id: e.target.id, value: e.target.value }
  });
  dispatch({ type: CALCULATE_CURRENCY });
};

export const handleCurrencyChange = e => dispatch => {
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
      });
  }

  if (e.target.name === "currencyTo") {
    dispatch({ type: CALCULATE_CURRENCY });
  }
};
