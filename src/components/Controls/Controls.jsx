import React, { Component } from "react";
import "./Controls.css";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import {currencies} from '../../data/currencies';
import {
  switchCurrencies,
  handleAmountChange,
  handleCurrencyChange
} from "../../store/actions/currencyActions";

const fromCurrencies = currencies;
const toCurrencies = currencies;

class Controls extends Component {
  constructor(props) {
    super(props);
    this.switchCurrecnies = this.switchCurrecnies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  switchCurrecnies() {
    this.props.switchCurrencies(this.props.currencyTo);
  }

  handleSelectChange(e) {
    this.props.handleCurrencyChange(e);
  }

  handleChange(e) {
    this.props.handleAmountChange(e);
  }

  render() {
    const { amountFrom, currencyFrom, currencyTo, amountTo } = this.props;
    return (
      <Box
        style={{ margin: "40px 0px" }}
        display="flex"
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

        <Button handleClick={this.switchCurrecnies} />

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
    );
  }
}

const mapStateToProps = state => {
  return {
    amountFrom: state.currency.amountFrom,
    amountTo: state.currency.amountTo,
    currencyFrom: state.currency.currencyFrom,
    currencyTo: state.currency.currencyTo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    switchCurrencies: (payload) => dispatch(switchCurrencies(payload)),
    handleAmountChange: payload => dispatch(handleAmountChange(payload)),
    handleCurrencyChange: payload => dispatch(handleCurrencyChange(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
