import Controls from "./Controls.jsx";
import { connect } from "react-redux";
import {
  switchCurrencies,
  handleAmountChange,
  handleCurrencyChange,
  setHistoryRates,
  setHistoryFrom,
  setHistoryTo
} from "../../store/actions/currencyActions";
const mapStateToProps = state => {
  return {
    amountFrom: state.currency.amountFrom,
    amountTo: state.currency.amountTo,
    currencyFrom: state.currency.currencyFrom,
    currencyTo: state.currency.currencyTo,
    historyFrom: state.currency.historyFrom,
    historyTo: state.currency.historyTo,
    error: state.ui.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    switchCurrencies: () => dispatch(switchCurrencies()),
    handleAmountChange: payload => dispatch(handleAmountChange(payload)),
    handleCurrencyChange: (e, payload) =>
      dispatch(handleCurrencyChange(e, payload)),
    setHistoryRates: payload => dispatch(setHistoryRates(payload)),
    setHistoryFrom: payload => dispatch(setHistoryFrom(payload)),
    setHistoryTo: payload => dispatch(setHistoryTo(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
