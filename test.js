const api = require('./src')

api.stream.kline({ symbol: 'btcusdt' }, cb => console.log(cb))