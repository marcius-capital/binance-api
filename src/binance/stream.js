// https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md

const NodeWebSocket = require('ws')
const WS = typeof window !== 'undefined' ? WebSocket : NodeWebSocket

// Rename options
const renameKeys = require("../renameKeys")
const { streamSchema } = require('./schema')
const rename = (data) => {
    const event = (data.e ||  data[0] && typeof data[0].e != 'undefined') ? (data.e || data[0].e) : 'bookTicker'
    return renameKeys(streamSchema[event], data)
}


const { updateSockets, closeSockets, closeSocket } = require('./helpers')

const url = 'wss://stream.binance.com:9443/ws/'

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

const setupWebSocket = ({ path, uniqueID = false }, callback) => {

    const stream = new WS(url + path)

    // event stream
    stream.onopen = () => console.log('[socket] Connected to exchange')
    stream.onclose = () => console.log('[socket] Connected closed')
    stream.onmessage = (message) => callback(rename(JSON.parse(message.data)))
    stream.onerror = (err) => console.error(err)

    updateSockets({ path, uniqueID }, stream) // Need to control open streams

    return stream
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
    close: {
        ...closeSocketApi,
        all: closeSockets
    }
}
