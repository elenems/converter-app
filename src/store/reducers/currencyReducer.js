import {
  SWITCH_CURRENCIES,
  CHANGE_AMOUNT,
  CHANGE_CURRENCY,
  SET_RATES,
  CALCULATE_CURRENCY,
  SET_HISTORY_RATES
} from "../actions/actionTypes";

const initState = {
  amountFrom: 1,
  amountTo: 0,
  currencyFrom: "",
  currencyTo: "",
  rates: null,
  historyRates: [],
  historyFrom: "2015-01-01"
};

const currencyReducer = (state = initState, action) => {
  if (
    action.type === SWITCH_CURRENCIES &&
    state.currencyFrom &&
    state.currencyTo
  ) {
    const { currencyFrom, currencyTo } = state;
    return {
      ...state,
      currencyFrom: currencyTo,
      currencyTo: currencyFrom
    };
  }

  if (
    action.type === SET_HISTORY_RATES &&
    state.currencyFrom &&
    state.currencyTo
  ) {
    return {
      ...state,
      historyRates: action.payload
    };
  }

  if (action.type === CHANGE_AMOUNT) {
    return {
      ...state,
      [action.payload.id]: action.payload.value
    };
  }

  if (action.type === CHANGE_CURRENCY) {
    return {
      ...state,
      [action.payload.name]: action.payload.value
    };
  }

  if (action.type === SET_RATES) {
    return {
      ...state,
      rates: action.payload
    };
  }

  if (action.type === CALCULATE_CURRENCY) {
    if (state.rates && state.currencyTo) {
      return {
        ...state,
        amountTo: state.amountFrom * state.rates[state.currencyTo]
      };
    }
    return state;
  }

  return state;
};

export default currencyReducer;
