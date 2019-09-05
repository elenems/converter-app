export const getCurrencyData = (currencies, from, to) => {
  const differences = [];
  const dates = [];
  let sortedCurrencies = [];

  for (let curr in currencies) {
    sortedCurrencies.push({
      date: curr,
      currencies: currencies[curr]
    });
  }

  sortedCurrencies = sortedCurrencies.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  for (let x of sortedCurrencies) {
    if (x["currencies"][from] !== x["currencies"][to]) {
      differences.push(x["currencies"][to] - x["currencies"][from]);
    } else {
      differences.push(x["currencies"][from]);
    }
    dates.push(x["date"]);
  }
  return { differences: differences, dates: dates };
};
