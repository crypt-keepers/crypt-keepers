const cleanPrice = (candleArray) => {
  return candleArray.slice().reverse().map(d => d[4]);
};

// Simple Moving Average. Default is 5-day. (use with 35-day for crossoever signals)
// output: [time, sma]
const sma = (candleArray, period = 5) => {
  const close = cleanPrice(candleArray);
  return candleArray.map((c, i) => {
    return i < period ? [c[0], undefined]
      : [c[0], close.slice(i - period, i).reduce((a, b) => a + b) / period];
  });
};

// output: [time, ema]
const ema = (candleArray, period = 5, close = cleanPrice(candleArray)) => {
  // const close = cleanPrice(candleArray);
  const initial = close.slice(0, period).reduce((a, b) => a + b) / period;
  const multiplier = 2 / (period + 1);
  const ma = candleArray.map(c => [c[0], undefined]);
  ma[period][1] = initial;
  for (let i = period + 1; i < close.length; i++) {
    ma[i] = [candleArray[i][0], ((close[i] - ma[i - 1][1]) * multiplier) + ma[i - 1][1]];
  }
  return ma;
};

// Chose period of 10, 20 or 50
// output: [time, sma, lower band, upper band]
const bollinger = (candleArray, period = 20) => {
  const multiplier = {
    10: 1.9,
    20: 2,
    50: 2.1
  };
  const ma = sma(candleArray, period);
  const close = cleanPrice(candleArray);
  const stdv = ma.map((a, i) => Math.sqrt(((close[i] - a[1]) ** 2) / period));
  return ma.map((m, i) => [...m, m[1] - (stdv[i] * multiplier[period]),
    m[1] + (stdv[i] * multiplier[period])]);
};

// output: [time, macd, signal, macd histogram]
const macd = (candleArray) => {
  const ema12 = ema(candleArray, 12).map((e, i) => e[1]);
  const ema26 = ema(candleArray, 26).map((e, i) => e[1]);
  const macdLine = ema12.map((e, i) => e - ema26[i]);
  const signal = ema(ema(candleArray, 12), 9, macdLine.slice(26));
  return signal.map((s, i) => [s[0], macdLine[i], s[1], macdLine[i] - s[1]]);
}

module.exports = {
  sma: sma,
  ema: ema,
  bollinger: bollinger,
  macd: macd
};
