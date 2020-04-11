// https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md

const { closeSockets, closeSocket } = require('./modules/helpers')
const setupWebSocket = require('./modules/websocket')
const { userData, closeUserData } = require('./userStream') // User data stream


const schema = {
    depth: ({ symbol, updateSpeed = 1000 }) => `${symbol.toLowerCase()}@depth@${updateSpeed}ms`, // updateSpeed: 100 or 1000
    depthLevel: ({ symbol, levels = 100, updateSpeed = 1000 }) => `${symbol.toLowerCase()}@depth${levels}@${updateSpeed}ms`,
    kline: ({ symbol, interval = '1h' }) => `${symbol.toLowerCase()}@kline_${interval}`,
    aggTrade: symbol => `${symbol.toLowerCase()}@aggTrade`,
    trade: symbol => `${symbol.toLowerCase()}@trade`,
    ticker: symbol => `${symbol.toLowerCase()}@ticker`,
    tickers: () => '!ticker@arr',
    miniTicker: symbol => `${symbol.toLowerCase()}@miniTicker`,
    miniTickers: () => '!miniTicker@arr',
    bookTicker: (symbol) => `${symbol.toLowerCase()}@bookTicker`, // Update Speed: Real-time
    bookTickers: () => `!bookTicker`, // Update Speed: Real-time
}

// Open connection
const api = Object.keys(schema).reduce((result, item) => {
    result[item] = (params, callback) => setupWebSocket({ path: schema[item](params), ...params }, callback)
    return result
}, {})

// Close connection
const closeSocketApi = Object.keys(schema).reduce((result, item) => {
    result[item] = (params) => {
        return (params && params.uniqueID) ? closeSocket(params.uniqueID) : closeSocket(schema[item](params))
    }
    return result
}, {})

module.exports = {
    ...api,
    userData,
    close: {
        ...closeSocketApi,
        userData: closeUserData,
        all: closeSockets
    }
}
