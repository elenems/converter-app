import {
  SWITCH_CURRENCIES,
  CHANGE_AMOUNT,
  CHANGE_CURRENCY,
  SET_HISTORY_FROM,
  SET_HISTORY_TO
} from "../actions/actionTypes";

export const setHistoryRates = payload => {
  return { type: CHANGE_CURRENCY, payload: { name: payload.name } };
};

export const switchCurrencies = () => {
  return { type: SWITCH_CURRENCIES };
};

export const handleAmountChange = e => {
  return {
    type: CHANGE_AMOUNT,
    payload: { id: e.target.id, value: e.target.value }
  };
};

export const handleCurrencyChange = e => {
  return {
    type: CHANGE_CURRENCY,
    payload: { name: e.target.name, value: e.target.value }
  };
};

export const setHistoryFrom = payload => {
  return { type: SET_HISTORY_FROM, payload: payload.historyFrom };
};

export const setHistoryTo = payload => {
  return { type: SET_HISTORY_TO, payload: payload.historyTo };
};
