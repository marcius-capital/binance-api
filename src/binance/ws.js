/*
* https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md
* Api use example:
*
* api.ws.depth('BNBBTC', callback => console.log(callback))
* api.ws.ohlc({symbol: 'BNBBTC', interval: '10m'}, callback => console.log(callback))
* api.ws.miniTickers(null, cb => console.log(cb))
* */

// https://www.npmjs.com/package/reconnecting-websocket
import ReconnectingWebSocket from 'reconnecting-websocket'
import NodeWebSocket from 'ws'

import renameKeys from "../renameKeys";

import {keyWSSchema, binanceWSSchema} from './schema'

const options = {
    WebSocket: typeof window !== 'undefined' ? WebSocket : NodeWebSocket, // custom WebSocket constructor
}

const url = 'wss://stream.binance.com:9443/ws/'

const schema = {
    depth: symbol => `${symbol.toLowerCase()}@depth`,
    depthLevel: ({symbol, level = 10}) => `${symbol.toLowerCase()}@depth${level}`,
    ohlc: ({symbol, interval = '1h'}) => `${symbol.toLowerCase()}@kline_${interval}`,
    aggTrade: symbol => `${symbol.toLowerCase()}@aggTrade`,
    trade: symbol => `${symbol.toLowerCase()}@trade`,
    ticker: symbol => `${symbol.toLowerCase()}@ticker`,
    tickers: () => '!ticker@arr',
    miniTicker: symbol => `${symbol.toLowerCase()}@miniTicker`,
    miniTickers: () => '!miniTicker@arr',
}

const rename = data => renameKeys(
    (Array.isArray(data) ? binanceWSSchema[data[0].e] : binanceWSSchema[data.e]),
    (keyWSSchema[data.e]) ? data[keyWSSchema[data.e]] : data,
)

const sockets = []

const setupWebSocket = (path, callback) => {

    const ws = new ReconnectingWebSocket(url + path, [], options)

    ws.onopen = () => console.log('Connected to exchange WS')
    ws.onclose = () => console.log('Connected WS closed')

    ws.onmessage = message => {
        callback(rename(JSON.parse(message.data)))
    }

    ws.onerror = (err) => {
        console.error(err)
        return callback(err)
    }

    sockets.push(ws)

    return ws
}

const terminate = () => {
    sockets.forEach(s => s.close())
}

const api = Object.keys(schema).reduce((result, item) => {
    result[item] = (data, callback) => setupWebSocket(schema[item](data), callback)
    return result
}, {})

module.exports = {
    ...api,
    terminate,
}
