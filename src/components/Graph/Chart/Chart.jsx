import React, { Component } from "react";
import ChartTable from "chart.js";
import { getCurrencyData } from "../utils";

let chart = null;
let ctx = null;

export default class Chart extends Component {
  componentDidMount() {
    ctx = document.getElementById("myChart").getContext("2d");
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.historyRates !== nextProps.historyRates) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    if (chart !== null) {
      chart.destroy();
    }

    const { historyRates, currencyFrom, currencyTo } = this.props;
    const { differences, dates } = getCurrencyData(
      historyRates,
      currencyFrom,
      currencyTo
    );

    chart = new ChartTable(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Currency difference",
            data: differences,
            pointBorderColor: "rgba(0,0,0,0)",
            pointBackgroundColor: "rgba(0,0,0,0)",
            backgroundColor: ["rgba(0,0,0,0)"],
            borderColor: ["#32a1ce"],
            borderWidth: 1
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              type: "time",
              time: {
                unit: "month"
              }
            }
          ]
        }
      }
    });
  }

  render() {
    return <canvas id="myChart"></canvas>;
  }
}
