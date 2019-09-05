import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "./Chart";

class Graph extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.historyRates !== nextProps.historyRates ||
      this.props.isLoading !== nextProps.isLoading
    ) {
      return true;
    }
    return false;
  }

  render() {
    const canvasStyle = this.props.isLoading
      ? { display: "none" }
      : { display: "block" };
    const paragraphStyle = this.props.isLoading
      ? {
          display: "block",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#3f51b5"
        }
      : { display: "none" };
    return (
      <div style={{ textAlign: "center" }}>
        <p style={paragraphStyle}>Loading...</p>
        <div style={canvasStyle} className="chart-container">
          <Chart
            currencyFrom={this.props.currencyFrom}
            currencyTo={this.props.currencyTo}
            historyRates={this.props.historyRates}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    historyRates: state.currency.historyRates,
    currencyFrom: state.currency.currencyFrom,
    currencyTo: state.currency.currencyTo,
    historyFrom: state.currency.historyFrom,
    isLoading: state.ui.isLoading
  };
};

export default connect(mapStateToProps)(Graph);
