import React, { Component } from "react";
import "./Controls.css";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import { currencies } from "../../data/currencies";
import RangeFilter from "./RangeFilter";
import {
  switchCurrencies,
  handleAmountChange,
  handleCurrencyChange,
  setHistoryRates,
  setHistoryFrom,
  setHistoryTo
} from "../../store/actions/currencyActions";

const fromCurrencies = currencies;
const toCurrencies = currencies;

class Controls extends Component {
  constructor(props) {
    super(props);
    this.switchCurrencies = this.switchCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.setHistoryFrom = this.setHistoryFrom.bind(this);
    this.setHistoryTo = this.setHistoryTo.bind(this);
  }

  switchCurrencies() {
    this.props.switchCurrencies({
      currencyTo: this.props.currencyTo
    });
  }

  handleSelectChange(e) {
    this.props.handleCurrencyChange(e);
  }

  handleChange(e) {
    this.props.handleAmountChange(e);
  }

  setHistoryFrom(dateFrom) {
    this.props.setHistoryFrom({
      historyFrom: dateFrom
    });
  }

  setHistoryTo(dateTo) {
    this.props.setHistoryTo({
      historyTo: dateTo,
    });
  }

  render() {
    const {
      amountFrom,
      currencyFrom,
      currencyTo,
      amountTo,
      historyFrom,
      historyTo
    } = this.props;
    return (
      <div>
        <div className="inputs">
          <Box
            style={{ margin: "40px 0px 20px" }}
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            <Input
              isDisabled={false}
              inputId="amountFrom"
              value={amountFrom}
              handleChange={this.handleChange}
              fieldLabel="Amount from"
            />

            <Select
              handleChange={this.handleSelectChange}
              selectValue={currencyFrom}
              values={fromCurrencies}
              selectLabel="Currency from"
              selectId="currencyFrom"
            />

            <Button handleClick={this.switchCurrencies} />

            <Select
              handleChange={this.handleSelectChange}
              selectValue={currencyTo}
              values={toCurrencies}
              selectLabel="Currency to"
              selectId="currencyTo"
            />

            <Input
              isDisabled={true}
              inputId="amountTo"
              value={amountTo}
              handleChange={this.handleChange}
              fieldLabel="Amount To"
            />
          </Box>
        </div>
        <div className="range-filters">
          <Box
            className="controls"
            style={{ margin: "20px 0px" }}
            display="flex"
          >
            <RangeFilter
              label='History from'
              historyChange={this.setHistoryFrom}
              historyRange={historyFrom}
            />
            <RangeFilter
              label = 'History to'
              historyChange={this.setHistoryTo}
              historyRange={historyTo}
            />
          </Box>
        </div>
        {this.props.error ? <p className="error">{this.props.error}</p> : null}
      </div>
    );
  }
}

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
    switchCurrencies: payload => dispatch(switchCurrencies(payload)),
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
