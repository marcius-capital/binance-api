const api = require('./api')

api.rest.ticker({symbol: 'btcusdt'.toUpperCase()}).then(cb => console.log(cb))
// api.rest.ticker({}).then(cb => console.log(cb)) // All tickers
// api.rest.ohlc({symbol: 'btcusdt'.toUpperCase(), interval: '1h',	limit: 500}).then(cb => console.log(cb))

// api.stream.trade('btcusdt', cb => console.log(cb))


