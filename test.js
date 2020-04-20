const api = require('./src')

// Fill for testing private request
const auth = {
    key: '',
    secret: '',
}

/**
 ** Rest
 */

// Public requests
// api.rest.exchangeInfo({}).then(res => console.log(res))
// api.rest.ticker({ symbol: 'BTCUSDT' }).then(res => console.log(res))
// api.rest.ticker({}).then(res => console.log(res))
// api.rest.ticker24hr({ symbol: 'BTCUSDT' }).then(res => console.log(res)) // Single ticker
// api.rest.ticker24hr({}).then(res => res.filter(i => parseFloat(i.volume) !== 0)).then(res => console.log(res)) // All tickers
// api.rest.klines({ symbol: 'BTCUSDT', interval: '1h', limit: 10 }).then(res => console.log(res))
// api.rest.depth({ symbol: 'BTCUSDT' }).then(res => console.log(res))
// api.rest.trades({ symbol: 'BTCUSDT', limit: 20 }).then(res => console.log(res))
// api.rest.aggTrades({ symbol: 'BTCUSDT' }).then(res => console.log(res))

// Private requests
// api.rest.account({ auth }).then(res => console.log(res))
// api.rest.account({ auth }).then(res => res.balances.filter(i => parseFloat(i.free + i.locked) > 0)) // Balance
// api.rest.allOrders({ params: { symbol: 'BTCUSDT' }, auth }).then(res => console.log(res))
// api.rest.openOrders({ params: { symbol: 'BTCUSDT' }, auth }).then(res => console.log(res))
// api.rest.createOrder({ params: { symbol: 'BTCUSDT', side: 'SELL', price: '8000', quantity: '0.01' }, auth }).then(res => console.log(res))
// api.rest.myTrades({ params: { symbol: 'BTCUSDT' }, auth }).then(res => console.log(res))

/**
 ** Rest with proxy
 */

// api.rest.ticker({ symbol: 'BTCUSDT', proxy: { host: 'http://localhost', port: '3000' } }).then(res => console.log(res))
// api.rest.account({ auth,  proxy: { host: 'http://localhost', port: '3000' } }).then(res => console.log(res))

/**
 ** Stream
 */

// api.stream.depth({ symbol: 'btcusdt', updateSpeed: 1000 }, cb => console.log(cb)) // updateSpeed: 1000ms default, can be 100 (100ms)
// api.stream.depthLevel({ symbol: 'btcusdt', level: 1, updateSpeed: 1000 }, cb => console.log(cb)) // level: 100 default, updateSpeed: 1000ms default, can be 100 (100ms)
// api.stream.kline({ symbol: 'btcusdt', interval: '1h' }, cb => console.log(cb))
// api.stream.aggTrade('btcusdt', cb => console.log(cb))
// api.stream.trade('btcusdt', cb => console.log(cb))
// api.stream.ticker('btcusdt', cb => console.log(cb))
// api.stream.tickers({}, cb => console.log(cb))
// api.stream.miniTicker('btcusdt', cb => console.log(cb))
// api.stream.miniTickers({}, cb => console.log(cb))

// Add new
// api.stream.bookTicker('btcusdt', cb => console.log(cb))  // Update Speed: Real-time
// api.stream.bookTickers({}, cb => console.log(cb))  // Update Speed: Real-time

/**
 ** Stream - user data
 */

// api.stream.userData({ auth, uniqueID: 'my_awesome_id' }, cb => console.log(cb))
// setTimeout(() => api.stream.close.userData({ uniqueID: 'my_awesome_id'}), 10000)

/**
 ** Error
 */

// api.error(err))
/*
api.rest.ticker({ symbol: 'BTCUSDT' })
    .then(res => console.log(res))
    .catch(err => console.err(api.error(err)))
*/